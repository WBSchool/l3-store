export type ProductData = {
    brand: string;
    brandId: number;
    colors: Array<{
        name: string;
        id: number;
    }>;
    diffPrice: boolean;
    extended: any;
    feedbacks: number;
    has_video?: boolean;
    id: number;
    isAdult?: boolean;
    isNew: boolean;
    kindId: number;
    name: string;
    offsize: boolean;
    option: {
        name: string;
        id: number;
    };
    outOfStock?: boolean;
    pics: number;
    price: number;
    priceU: number;
    promoTextCard: string;
    promoTextCat: string;
    quantity: number;
    rating: number; // @deprecated
    reviewRating: number;
    rids: Array<string>;
    positions?: Array<{
        rid: string;
        wh: number;
        return_fee?: number;
    }>;
    root: number;
    sale: number;
    salePrice: number;
    salePriceU: number;
    saleConditions: number;
    siteBrandId: number;
    logisticsCost?: number;
    volume?: number;
    sizes: Array<any>;
    subjectId: number;
    time1?: number;
    time2?: number;
    wh: number;
    subjectParentId: number;
    supplierId: number;
    disabledForRegion?: boolean;
    return_fee?: number;
    time?: number; // timestamp
    dist?: number,
    log?: any;
    src: string;
    description: string;
}
