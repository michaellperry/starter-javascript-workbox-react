import * as Jimp from 'jimp';
import * as path from 'path';

async function resize(fileName, width, height, mimeType) {
  if ((width && width > 2048) || (height && height > 2048)) {
    throw new Error('Requested image size too large.');
  }

  const image = await Jimp.read(fileName);
  const resizedImage = (
    (width && height) ? image.background(0).contain(width, height) :
    (width)           ? image.resize(width, Jimp.AUTO) :
    (height)          ? image.resize(Jimp.AUTO, height) :
    image
  );
  const buffer = await resizedImage.getBufferAsync(mimeType);
  return buffer;
}

function safeFormat(format) {
  return (
    format === 'jpeg' ? 'jpeg' :
    format === 'jpg'  ? 'jpeg' :
    format === 'bmp'  ? 'bmp'  :
    'png'
  );
}

export async function renderImage(req, res, imageFileName) {
  // Extract the query-parameter
  const widthString = req.query.width;
  const heightString = req.query.height;
  const format = req.query.format;

  // Parse to integer if possible
  let width, height;
  if (widthString) {
    width = parseInt(widthString);
  }
  if (heightString) {
    height = parseInt(heightString);
  }

  // Set the content-type of the response
  const mimeType = `image/${safeFormat(format)}`;
  res.type(mimeType);

  // Get the resized image
  const image = await resize(
      path.join(__dirname, imageFileName),
      width, height, mimeType);
  res.send(image);
}
