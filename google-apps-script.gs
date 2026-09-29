const DRIVE_FOLDER_ID = "1ThV0d1kfK9NuwuSyBpSL1iGcKNC_Y2QH";
const MAX_FILE_BYTES = 15 * 1024 * 1024;

function doPost(e) {
  try {
    if (!e || !e.parameter) {
      return textResponse("missing request");
    }

    const guestName = String(e.parameter.name || "").trim();
    const originalFileName = String(e.parameter.fileName || "foto").trim();
    const mimeType = String(e.parameter.mimeType || "application/octet-stream").trim();
    const base64 = String(e.parameter.data || "");

    if (!guestName || !base64) {
      return textResponse("missing name or file");
    }

    if (guestName.length > 80) {
      return textResponse("name too long");
    }

    const bytes = Utilities.base64Decode(base64);
    if (bytes.length > MAX_FILE_BYTES) {
      return textResponse("file too large");
    }

    const safeName = sanitizeFilePart(guestName);
    const safeOriginalName = sanitizeFilePart(originalFileName);
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");
    const finalName = `${safeName}_${timestamp}_${safeOriginalName}`;

    const blob = Utilities.newBlob(bytes, mimeType, finalName);
    DriveApp.getFolderById(DRIVE_FOLDER_ID).createFile(blob);

    return textResponse("ok");
  } catch (error) {
    console.error(error);
    return textResponse("error");
  }
}

function sanitizeFilePart(value) {
  return String(value || "")
    .replace(/[\\/:*?"<>|#%{}~&]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100) || "convidado";
}

function textResponse(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}
