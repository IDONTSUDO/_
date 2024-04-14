export interface FullInfoProductOzon {
  id: number;
  name: string;
  offer_id: string;
  barcode: string;
  barcodes: string[];
  buybox_price: string;
  category_id: number;
  type_id: number;
  created_at: Date;
  images: string[];
  has_discounted_item: boolean;
  is_discounted: boolean;
  discounted_stocks: Stocks;
  currency_code: string;
  description_category_id: number;
  marketing_price: string;
  min_price: string;
  old_price: string;
  premium_price: string;
  price: string;
  recommended_price: string;
  sources: Source[];
  stocks: Stocks;
  errors: any[];
  updated_at: Date;
  vat: string;
  visible: boolean;
  visibility_details: VisibilityDetails;
  price_indexes: PriceIndexes;
  commissions: any[];
  volume_weight: number;
  is_prepayment: boolean;
  is_prepayment_allowed: boolean;
  images360: any[];
  is_kgt: boolean;
  color_image: string;
  primary_image: string;
  status: Status;
}

export interface Stocks {
  coming: number;
  present: number;
  reserved: number;
}

export interface PriceIndexes {
  external_index_data: IndexData;
  ozon_index_data: IndexData;
  price_index: string;
  self_marketplaces_index_data: IndexData;
}

export interface IndexData {
  minimal_price: string;
  minimal_price_currency: string;
  price_index_value: number;
}

export interface Source {
  is_enabled: boolean;
  sku: number;
  source: string;
}

export interface Status {
  state: string;
  state_failed: string;
  moderate_status: string;
  decline_reasons: any[];
  validation_state: string;
  state_name: string;
  state_description: string;
  is_failed: boolean;
  is_created: boolean;
  state_tooltip: string;
  item_errors: ItemError[];
  state_updated_at: Date;
}

export interface ItemError {
  code: string;
  field: string;
  attribute_id: number;
  state: string;
  level: string;
  description: string;
  optional_description_elements: OptionalDescriptionElements;
  attribute_name: string;
}

export interface OptionalDescriptionElements {}

export interface VisibilityDetails {
  has_price: boolean;
  has_stock: boolean;
  active_product: boolean;
}
