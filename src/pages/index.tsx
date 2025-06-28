import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SOUHL商品管理システム
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            GraphQL + Apollo Client + Radix UI + React Hook Form + Zod を学習するプロトタイプ
          </p>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">使用技術</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">フロントエンド</h3>
                <ul className="text-sm text-blue-600 mt-2">
                  <li>• Next.js (Pages Router)</li>
                  <li>• React</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">データ管理</h3>
                <ul className="text-sm text-green-600 mt-2">
                  <li>• GraphQL</li>
                  <li>• Apollo Client</li>
                  <li>• GraphQL Code Generator</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800">UI コンポーネント</h3>
                <ul className="text-sm text-purple-600 mt-2">
                  <li>• Radix UI</li>
                  <li>• React Hook Form</li>
                  <li>• Zod</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-800">アーキテクチャ</h3>
                <ul className="text-sm text-orange-600 mt-2">
                  <li>• Package by Feature</li>
                  <li>• Fragment Collocation</li>
                  <li>• Type Safety</li>
                </ul>
              </div>
            </div>

            <Link href="/products">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg">
                商品管理画面を開く →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
