import { useProduct } from 'vtex.product-context'
import WrapperProgressiveDiscount from './wrapper'

const ProgressiveDiscountTable = () => {
  const productContextValue = useProduct()
  const {
    product: { benefits },
    selectedItem: {
      measurementUnit,
      sellers: [
        {
          commertialOffer: { Price, teasers },
        },
      ],
    },
  } = productContextValue

  if (!benefits?.length) {
    if (teasers?.length && teasers[0].effects.parameters.length) {
      return (
        <WrapperProgressiveDiscount
          isModal
          title={teasers[0].name}
          basePrice={Price}
          measurementUnit={measurementUnit}
          benefits={teasers.map((t) => ({
            minQuantity: t?.conditions?.minimumQuantity,
            discount:
              t?.effects?.parameters[0].name === 'PercentualDiscount'
                ? t?.effects?.parameters[0].value
                : 0,
          }))}
        />
      )
    }

    return null
  }

  return (
    <WrapperProgressiveDiscount
      basePrice={Price}
      measurementUnit={measurementUnit}
      benefits={benefits.map((b) => ({
        minQuantity: b?.items[0]?.minQuantity,
        discount: b?.items[0]?.discount,
      }))}
    />
  )
}

export default ProgressiveDiscountTable
