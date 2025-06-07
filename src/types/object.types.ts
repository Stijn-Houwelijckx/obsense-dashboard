export type Objects = {
  objects: ObjectItem[];
};

export type Object = {
  object: ObjectItem;
};

export type ObjectItem = {
  _id: string;
  title: string;
  description: string;
  file: {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  };
  thumbnail: {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  };
};

export type ObjectItemFormData = Omit<ObjectItem, 'file' | 'thumbnail'> & {
  file: File;
};

export type ObjectItemThumbnailFormData = Pick<ObjectItem, 'thumbnail'> & {
  thumbnail: File;
};
