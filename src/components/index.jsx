import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
  AllCategory
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";
import AllProducts from './shop/products/index'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProductModal from "./shop/products/AddProductModal";
import ProductMap from "./shop/products/ProductByMap";
import UserProducts from "./shop/userProducts";
import AllProductSearch from "./shop/SearchFilter";

/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/product/map" component={ProductMap} />
        <Route exact path="/categories" component={AllCategory} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/my-products" component={UserProducts} />
        <Route exact path="/category/:catId" component={ProductByCategory} />
        <Route exact path="/search/:searchName" component={AllProductSearch} />
        <CartProtectedRoute exact={true} path="/checkout" component={CheckoutPage} />
        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/categories"
          component={Categories}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/products"
          component={Products}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/orders"
          component={Orders}
        />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <Route path="/upload" component={AddProductModal} />

        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
        <ProtectedRoute
          exact={true}
          path="/user/orders"
          component={UserOrders}
        />
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />
        {/* User Dashboard End */}

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
