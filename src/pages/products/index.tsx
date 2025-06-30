import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import * as Dialog from '@radix-ui/react-dialog'
import { ProductTable, PRODUCT_TABLE_FRAGMENT } from '@/features/products/components/ProductTable'
import { ProductDialog, PRODUCT_DIALOG_FRAGMENT } from '@/features/products/components/ProductDialog'
import { useRouter } from 'next/router'

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      ...ProductTableItem
    }
  }
  ${PRODUCT_TABLE_FRAGMENT}
`

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      ...ProductDialogResult
    }
  }
  ${PRODUCT_DIALOG_FRAGMENT}
`

export default function ProductsPage() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const router = useRouter()
    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS)
    const [createProduct] = useMutation(CREATE_PRODUCT, {
        onCompleted: () => {
            refetch()
            setDialogOpen(false)
        }
    })

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div>読み込み中...</div>
        </div>
    )

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-red-600">エラー: {error.message}</div>
        </div>
    )

    const products = data?.products || []

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">商品管理</h1>

                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <Dialog.Trigger asChild>
                        <div className="flex gap-4">
                            <button onClick={() => router.push('/')}
                                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'>
                                ホームに戻る
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                商品を追加
                            </button>
                        </div>
                    </Dialog.Trigger>

                    <ProductDialog onSubmit={createProduct} />
                </Dialog.Root>
            </div>

            <ProductTable products={products} />
        </div>
    )
} 