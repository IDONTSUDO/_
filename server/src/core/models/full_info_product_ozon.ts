
export interface FullInfoProductOzon {
  id:                      number;
  name:                    string;
  offer_id:                string;
  is_archived:             boolean;
  is_autoarchived:         boolean;
  barcodes:                string[];
  description_category_id: number;
  type_id:                 number;
  created_at:              Date;
  images:                  string[];
  currency_code:           string;
  marketing_price:         string;
  min_price:               string;
  old_price:               string;
  price:                   string;
  sources:                 Source[];
  model_info:              ModelInfo;
  commissions:             Commission[];
  is_prepayment_allowed:   boolean;
  volume_weight:           number;
  has_discounted_fbo_item: boolean;
  is_discounted:           boolean;
  discounted_fbo_stocks:   number;
  stocks:                  Stocks;
  errors:                  any[];
  updated_at:              Date;
  vat:                     string;
  visibility_details:      VisibilityDetails;
  price_indexes:           PriceIndexes;
  images360:               any[];
  is_kgt:                  boolean;
  color_image:             any[];
  primary_image:           string[];
  statuses:                Statuses;
  is_super:                boolean;
}

export interface Commission {
  delivery_amount?: number;
  percent:          number;
  return_amount?:   number;
  sale_schema:      string;
  value:            number;
}

export interface ModelInfo {
  model_id: number;
  count:    number;
}

export interface PriceIndexes {
  color_index:                  string;
  external_index_data:          IndexData;
  ozon_index_data:              IndexData;
  self_marketplaces_index_data: IndexData;
}

export interface IndexData {
  minimal_price:          string;
  minimal_price_currency: string;
  price_index_value:      number;
}

export interface Source {
  sku:           number;
  source:        string;
  created_at:    Date;
  shipment_type: string;
  quant_code:    string;
}

export interface Statuses {
  status:             string;
  status_failed:      string;
  moderate_status:    string;
  validation_status:  string;
  status_name:        string;
  status_description: string;
  is_created:         boolean;
  status_tooltip:     string;
  status_updated_at:  Date;
}

export interface Stocks {
  has_stock: boolean;
  stocks:    Stock[];
}

export interface Stock {
  present:  number;
  reserved: number;
  sku:      number;
  source:   string;
}

export interface VisibilityDetails {
  has_price: boolean;
  has_stock: boolean;
}
