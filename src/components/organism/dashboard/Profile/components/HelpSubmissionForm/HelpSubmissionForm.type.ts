export type ServiceWithReason = {
  fields: {
    label: string;
    value: string;
    order?: string;
    reasonsList?: ServiceWithReason[];
  };
};
