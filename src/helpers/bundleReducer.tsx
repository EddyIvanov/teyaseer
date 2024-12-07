/**
 * This helper created because in some page we have unnecessary fields and data that increasing the getStaticProps bundle size more than 128kb limit.
 * So we need to optimize the data that we get from contentful to reduce the bundle size.
 */
import { ContentTypeResponseType } from '@/types/ContentFul.type';

/**
 *
 * @Param page: ContentTypeResponseType
 * @Param villaLimit: number
 * @description This function is used to optimize the BeInspired page data by filtering the villas based on the isFeatured field and limiting the number of villas to be displayed on the page.
 */
export const OptimizeBeInspiredPageData = (
  page: ContentTypeResponseType,
  villaLimit: number = 2
) => {
  try {
    const rendering = page.items[0].fields.renderings[1];
    const villaDesignTypes = rendering.fields['villaDesignTypes'];
    const newVillaDesignTypes = villaDesignTypes.map((designType: any) => {
      let villas = designType.fields['villas'];
      villas = villas.filter((villa: any) => !!villa.fields.isFeatured);
      const newVillas = villas.slice(0, villaLimit);
      designType.fields['villas'] = newVillas;
      return designType;
    });
    rendering.fields['villaDesignTypes'] = newVillaDesignTypes;
  } catch (e) {
    console.error('Error in OptimizeBeInspiredPageData', e);
  }
  return {
    ...page,
  };
};

/**
 *
 * @param villas
 * @Description This function is used to optimize the SelectVilla page data by removing unnecessary fields and metadata.
 */
export const OptimizeSelectVillaPageData = (
  villas: ContentTypeResponseType
) => {
  try {
    const villaList = villas.items;
    for (const villa of villaList) {
      delete villa.metadata;
      delete villa.fields.description;
      delete villa.fields.floorPlanLink;
      delete villa.fields.floorPlanPdf;
      for (const spec in villa.fields.specifications) {
        delete villa.fields.specifications[spec].metadata;
        delete villa.fields.specifications[spec].sys;
        delete villa.fields.specifications[spec].fields.size;
        delete villa.fields.specifications[spec].fields.fieldName;
        delete villa.fields.specifications[spec].fields.numberValue;
        delete villa.fields.specifications[spec].fields.value;
        delete villa.fields.specifications[spec].fields.question;
      }
    }
  } catch (e) {
    console.error('Error in OptimizeSelectVillaPageData', e);
  }
  return {
    ...villas,
  };
};
/**
 *
 * @param page
 * @Description This function is used to optimize the VillaList page data by removing unnecessary fields and metadata.
 * It also filters the villas based on the villaType and limits the number of villas to be displayed on the page.
 * The default limit is 10.
 */
export const OptimizeVillaListPage = (page: any, villaType: string) => {
  try {
    delete page['includes'];
    delete page['asset'];
    for (const item of page.items) {
      const villaDesign =
        item.fields.renderings[0].fields.villaDesignTypes.find(
          (villaDesign: any) =>
            villaDesign.fields.contentType.toLowerCase().includes(villaType)
        );
      villaDesign.fields.villas.sort(
        (a: any, b: any) => a.fields.id - b.fields.id
      );
      villaDesign.fields.villas = villaDesign.fields.villas.splice(0, 10);
      item.fields.renderings[0].fields.villaDesignTypes = villaDesign;
    }
  } catch (e) {
    console.error('Error in OptimizeVillaList', e);
  }
  return {
    ...page,
  };
};
