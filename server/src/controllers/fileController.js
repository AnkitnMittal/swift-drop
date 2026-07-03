import File from '../models/File.js';

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileObj = {
    path: req.file.path,
    name: req.file.originalname,
  };

  try {
    const file = await File.create(fileObj);
    const fileUrl = `${req.protocol}://${req.get('host')}/file/${file._id}`;

    res.status(200).json({
      path: fileUrl,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ message: 'Failed to upload file to database' });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found or has been deleted' });
    }

    file.downloadCount++;
    await file.save();

    res.download(file.path, file.name);
  } catch (error) {
    console.error('Download Error:', error.message);
    res.status(500).json({ message: 'Server error while fetching file' });
  }
};
