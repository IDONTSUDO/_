export interface OzonPayments {
  operations: Operation[];
  page_count: number;
  row_count: number;
}

export interface Operation {
  operation_id: number;
  operation_type: OperationType;
  operation_date: Date;
  operation_type_name: OperationTypeName;
  delivery_charge: number;
  return_delivery_charge: number;
  accruals_for_sale: number;
  sale_commission: number;
  amount: number;
  type: Type;
  posting: Posting;
  items: Item[];
  services: Service[];
}

export interface Item {
  name: string;
  sku: number;
}

export enum OperationType {
  ClientReturnAgentOperation = "ClientReturnAgentOperation",
  MarketplaceRedistributionOfAcquiringOperation = "MarketplaceRedistributionOfAcquiringOperation",
  OperationAgentDeliveredToCustomer = "OperationAgentDeliveredToCustomer",
  OperationAgentStornoDeliveredToCustomer = "OperationAgentStornoDeliveredToCustomer",
  OperationItemReturn = "OperationItemReturn",
  OperationMarketplaceFlexiblePaymentSchedule = "OperationMarketplaceFlexiblePaymentSchedule",
  OperationMarketplaceServicePremiumCashbackIndividualPoints = "OperationMarketplaceServicePremiumCashbackIndividualPoints",
  OperationMarketplaceSupplyAdditional = "OperationMarketplaceSupplyAdditional",
}

export enum OperationTypeName {
  ShippingAndProcessingReturnsCancellationDoNotRedeem = "Доставка и обработка возврата, отмены, невыкупа",
  DeliveryToTheBuyer = "Доставка покупателю",
  DeliveryToBuyerCancelCharges = "Доставка покупателю — отмена начисления",
  AccrualForFlexiblePaymentSchedule = "Начисление за гибкий график выплат",
  ProcessingOfGoodsAsPartOfCargoPackagesAtFBO = "Обработка товара в составе грузоместа на FBO",
  PaymentAcquiring = "Оплата эквайринга",
  ReceivingReturnCancellationNonRepurchaseFromBuyer = "Получение возврата, отмены, невыкупа от покупателя",
  ServicePromotionsBonusesSeller = "Услуга продвижения Бонусы продавца",
}

export interface Posting {
  delivery_schema: DeliverySchema;
  order_date: string;
  posting_number: string;
  warehouse_id: number;
}

export enum DeliverySchema {
  Empty = "",
  Fbo = "FBO",
}

export interface Service {
  name: Name;
  price: number;
}

export enum Name {
  MarketplaceRedistributionOfAcquiringOperation = "MarketplaceRedistributionOfAcquiringOperation",
  MarketplaceServiceItemDelivToCustomer = "MarketplaceServiceItemDelivToCustomer",
  MarketplaceServiceItemDirectFlowLogistic = "MarketplaceServiceItemDirectFlowLogistic",
  MarketplaceServiceItemDirectFlowLogisticVDC = "MarketplaceServiceItemDirectFlowLogisticVDC",
  MarketplaceServiceItemDirectFlowTrans = "MarketplaceServiceItemDirectFlowTrans",
  MarketplaceServiceItemFulfillment = "MarketplaceServiceItemFulfillment",
  MarketplaceServiceItemRedistributionReturnsPVZ = "MarketplaceServiceItemRedistributionReturnsPVZ",
  MarketplaceServiceItemReturnAfterDelivToCustomer = "MarketplaceServiceItemReturnAfterDelivToCustomer",
  MarketplaceServiceItemReturnFlowLogistic = "MarketplaceServiceItemReturnFlowLogistic",
  MarketplaceServiceItemReturnNotDelivToCustomer = "MarketplaceServiceItemReturnNotDelivToCustomer",
  MarketplaceServicePremiumCashbackIndividualPoints = "MarketplaceServicePremiumCashbackIndividualPoints",
}

export enum Type {
  Orders = "orders",
  Other = "other",
  Returns = "returns",
  Services = "services",
}
