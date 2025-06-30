import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as Dialog from '@radix-ui/react-dialog'
import { FetchResult, gql, MutationFunctionOptions, OperationVariables } from '@apollo/client'

export const PRODUCT_DIALOG_FRAGMENT = gql`
  fragment ProductDialogResult on Product {
    id
    name
    price
    description
  }
`

const productSchema = z.object({
    name: z.string().min(1, '商品名は必須です').max(100, '商品名は100文字以内で入力してください'),
    price: z.number().min(1, '価格は1円以上で入力してください').max(9999999, '価格は9,999,999円以下で入力してください'),
    description: z.string().min(1, '説明は必須です').max(500, '説明は500文字以内で入力してください'),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductDialogProps {
    onSubmit: (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any>>
}

export function ProductDialog({ onSubmit }: ProductDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    })

    const onSubmitForm = async (data: ProductFormData) => {
        try {
            await onSubmit({
                variables: {
                    input: {
                        name: data.name,
                        price: data.price,
                        description: data.description,
                    },
                }
            })
            reset() // フォームをリセット
        } catch (error) {
            console.error('商品の追加に失敗しました:', error)
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
            <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    新しい商品を追加
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            商品名 *
                        </label>
                        <input
                            {...register('name')}
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="商品名を入力してください"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            価格 (円) *
                        </label>
                        <input
                            {...register('price', { valueAsNumber: true })}
                            type="number"
                            id="price"
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="価格を入力してください"
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            説明 *
                        </label>
                        <textarea
                            {...register('description')}
                            id="description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="商品の説明を入力してください"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Dialog.Close asChild>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                disabled={isSubmitting}
                            >
                                キャンセル
                            </button>
                        </Dialog.Close>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                        >
                            {isSubmitting ? '追加中...' : '商品を追加'}
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
} 