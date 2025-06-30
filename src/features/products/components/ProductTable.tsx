import { GetProductsQuery, ProductTableItemFragmentDoc } from '@/lib/graphql/generated/graphql'
import { useFragment } from '@/lib/graphql/generated/fragment-masking'
import { gql } from '@apollo/client'

export const PRODUCT_TABLE_FRAGMENT = gql`
  fragment ProductTableItem on Product {
    id
    name
    price
    description
  }
`

interface ProductTableProps {
    products: GetProductsQuery['products']
}

export function ProductTable({ products }: ProductTableProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price)
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500">商品がまだありません</div>
                <div className="text-sm text-gray-400 mt-2">「商品を追加」ボタンから新しい商品を追加してください</div>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            商品名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            価格
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            説明
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => {
                        // 🎭 Fragment Maskingを解除して実際のデータを取得
                        const actualProduct = useFragment(ProductTableItemFragmentDoc, product)

                        return (
                            <tr key={actualProduct.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{actualProduct.name}</div>
                                    <div className="text-xs text-gray-500">ID: {actualProduct.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-semibold text-green-600">
                                        {formatPrice(actualProduct.price)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-600 max-w-xs">{actualProduct.description}</p>
                                    {/* 🚫 categoryはFragmentで定義していないのでアクセス不可 */}
                                    {/* <p className="text-xs text-blue-500">Category: {actualProduct.category}</p> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
} 