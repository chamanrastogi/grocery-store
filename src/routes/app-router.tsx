import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/layouts/root-layout'
import { AccountLayout } from '@/layouts/account-layout'
import { PageLoader } from '@/components/common/page-loader'
import { HomePage } from '@/pages/home-page'

const ProductsPage = lazy(() =>
  import('@/pages/products-page').then((m) => ({ default: m.ProductsPage })),
)
const CategoryPage = lazy(() =>
  import('@/pages/category-page').then((m) => ({ default: m.CategoryPage })),
)
const ProductDetailPage = lazy(() =>
  import('@/pages/product-detail-page').then((m) => ({ default: m.ProductDetailPage })),
)
const SearchPage = lazy(() => import('@/pages/search-page').then((m) => ({ default: m.SearchPage })))
const CartPage = lazy(() => import('@/pages/cart-page').then((m) => ({ default: m.CartPage })))
const WishlistPage = lazy(() =>
  import('@/pages/wishlist-page').then((m) => ({ default: m.WishlistPage })),
)
const CheckoutPage = lazy(() =>
  import('@/pages/checkout-page').then((m) => ({ default: m.CheckoutPage })),
)
const OrdersPage = lazy(() => import('@/pages/orders-page').then((m) => ({ default: m.OrdersPage })))
const OrderDetailPage = lazy(() =>
  import('@/pages/order-detail-page').then((m) => ({ default: m.OrderDetailPage })),
)
const ProfilePage = lazy(() =>
  import('@/pages/profile-page').then((m) => ({ default: m.ProfilePage })),
)
const AddressesPage = lazy(() =>
  import('@/pages/addresses-page').then((m) => ({ default: m.AddressesPage })),
)
const LoginPage = lazy(() => import('@/pages/login-page').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() =>
  import('@/pages/register-page').then((m) => ({ default: m.RegisterPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
)

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="product/:slug" element={<ProductDetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route element={<AccountLayout />}>
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="addresses" element={<AddressesPage />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}