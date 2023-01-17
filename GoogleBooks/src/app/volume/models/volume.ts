export interface IVolume {
  id: string;
  saleInfo: {
    country: string,
    saleability: string,
    isEbook: boolean,
    listPrice: {
      amount: string
      currencyCode: string;
    }
  };
  accessInfo: {
    pdf: {
      downloadLink: string;
      isAvailable: boolean;
    }
  };
  volumeInfo: {
    imageLinks: { thumbnail: string };
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    categories: string[];
    pageCount: number;
    averageRating: number;
  };
}

export interface IVolumes {
  items: Array<IVolume>;
}

