// ============================================================
//  FoReal — Central API Client
//  Base URL: https://rentasuit.ca/api/v1.0/
// ============================================================

// Proxy prefix — avoids conflict with Next.js built-in /api/* route handler.
// next.config.ts rewrites /rent-api/* → https://rentasuit.ca/api/v1.0/*
export const API_BASE = "/rent-api";


function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("foreal_token");
}

type FetchOptions = RequestInit & {
  auth?: boolean; // whether to attach Bearer token (default: false)
};

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { auth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set Content-Type for JSON bodies (not FormData)
  if (
    fetchOptions.body &&
    !(fetchOptions.body instanceof FormData) &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new APIError(data?.message || "API error", res.status, data);
  }

  return data as T;
}

export class APIError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, body: any) {
    let finalMessage = message;
    
    // Attempt to extract specific validation errors from Laravel backend structure
    if (body?.data && typeof body.data === "object") {
      const firstKey = Object.keys(body.data)[0];
      if (firstKey && Array.isArray(body.data[firstKey])) {
        finalMessage = body.data[firstKey][0];
      }
    } else if (body?.errors && typeof body.errors === "object") {
      const firstKey = Object.keys(body.errors)[0];
      if (firstKey && Array.isArray(body.errors[firstKey])) {
        finalMessage = body.errors[firstKey][0];
      }
    }

    super(finalMessage);
    this.name = "APIError";
    this.status = status;
    this.data = body;
  }
}

// ============================================================
//  Typed endpoint wrappers
// ============================================================

// --- Auth ---
export const authAPI = {
  register: (payload: RegisterPayload) =>
    apiFetch<AuthResponse>("/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (body: LoginPayload) =>
    apiFetch<AuthResponse>("/signin", {
      method: "POST",
      body: buildFormData(body),
    }),

  logout: () =>
    apiFetch<{ message: string }>("/logout", { method: "POST", auth: true }),

  forgotPassword: (email: string) =>
    apiFetch<{ message: string }>("/forgot-password", {
      method: "POST",
      body: buildFormData({ email }),
    }),

  resetPassword: (body: ResetPasswordPayload) =>
    apiFetch<{ message: string }>("/reset-password", {
      method: "POST",
      body: buildFormData(body),
    }),
};

// --- User ---
export const userAPI = {
  getProfile: () => apiFetch<ProfileResponse>("/profile", { auth: true }),

  updateProfile: (body: FormData) =>
    apiFetch<{ message: string; data?: User }>("/profile-update", {
      method: "POST",
      body,
      auth: true,
    }),

  updateBodyDetails: (body: BodyDetailsPayload) =>
    apiFetch<{ message: string }>("/update-profile/body-details", {
      method: "POST",
      body: buildFormData(body),
      auth: true,
    }),

  changePassword: (body: ChangePasswordPayload) =>
    apiFetch<{ message: string }>("/change-password", {
      method: "POST",
      body: buildFormData(body),
      auth: true,
    }),

  updatePaypal: (paypal_email: string) =>
    apiFetch<{ message: string }>("/update-paypal-account", {
      method: "POST",
      body: buildFormData({ paypal_email_address: paypal_email }),
      auth: true,
    }),

  verifyCode: (verification_code: string) =>
    apiFetch<AuthResponse>("/verify-code", {
      method: "POST",
      body: buildFormData({ verification_code }),
      auth: true,
    }),

  resendVerificationCode: () =>
    apiFetch<{ message: string }>("/resend-verification-code", {
      method: "POST",
      auth: true,
    }),

  updateFirebaseId: (firebase_id: string) =>
    apiFetch<{ message: string }>("/update-firebase-id", {
      method: "POST",
      body: buildFormData({ firebase_id }),
      auth: true,
    }),

  getPaypalConnectUrl: () =>
    apiFetch<{ message: string; data?: { url: string } }>("/get-paypal-connect-url", {
      method: "POST",
      auth: true,
    }),

  getPaypalConnectStatus: (authorization: string) =>
    apiFetch<{ message: string }>("/get-paypal-connect-status", {
      method: "POST",
      body: buildFormData({ authorization }),
      auth: true,
    }),
};

// --- Products ---
export const productsAPI = {
  // GET /new-added-product?from_date=YYYY-MM-DD&results_per_page=20&page=1
  newProducts: (from_date?: string) => {
    const date = from_date || (() => {
      const d = new Date();
      d.setMonth(d.getMonth() - 3);
      return d.toISOString().split("T")[0];
    })();
    return apiFetch<ProductListResponse>(
      `/new-added-product?from_date=${date}&results_per_page=20&page=1`
    );
  },

  // GET /product-search?search=<keyword>&results_per_page=20&page=1
  search: (params?: ProductSearchParams) => {
    const cleaned: Record<string, string> = {};
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== "") cleaned[k] = String(v);
      }
    }
    // Backend REQUIRES these fields — always include them
    if (!cleaned.search) cleaned.search = "a";
    if (!cleaned.results_per_page) cleaned.results_per_page = "20";
    if (!cleaned.page) cleaned.page = "1";
    const qs = "?" + new URLSearchParams(cleaned).toString();
    return apiFetch<ProductListResponse>(`/product-search${qs}`);
  },

  detail: (product_id: number | string) =>
    apiFetch<ProductDetailResponse>(`/product-detail?product_id=${product_id}`),

  detailBySeo: (seo_url: string) =>
    apiFetch<ProductDetailResponse>(`/product-detail-seo?seo_url=${seo_url}`),

  list: (page = 1, itemsPerPage = 20) =>
    apiFetch<ProductListResponse>(
      `/product-list?page=${page}&results_per_page=${itemsPerPage}`
    ),

  filtered: (params?: Record<string, string>) => {
    const defaults: Record<string, string> = {
      page: "1",
      results_per_page: "20",
    };
    const merged = { ...defaults, ...params };
    const qs = "?" + new URLSearchParams(merged).toString();
    return apiFetch<ProductListResponse>(`/product-list-filter${qs}`);
  },

  reviews: (product_id: number | string) =>
    apiFetch<ReviewsResponse>(`/reviews?product_id=${product_id}`),
};

// --- My Products (Vendor) ---
export const myProductsAPI = {
  list: (page = 1, itemsPerPage = 20, sort = "date-recently") =>
    apiFetch<ProductListResponse>(
      `/products/my-posted-items?page=${page}&results_per_page=${itemsPerPage}&sort=${sort}`,
      { auth: true }
    ),

  detail: (product_id: number | string) =>
    apiFetch<ProductDetailResponse>(`/product/${product_id}`, { auth: true }),

  add: (body: FormData) =>
    apiFetch<{ message: string; data?: Product }>("/product/add", {
      method: "POST",
      body,
      auth: true,
    }),

  update: (body: FormData) =>
    apiFetch<{ message: string }>("/product/update", {
      method: "POST",
      body,
      auth: true,
    }),

  remove: (product_id: number | string) =>
    apiFetch<{ message: string }>(`/product/remove?product_id=${product_id}`, {
      method: "DELETE",
      auth: true,
    }),

  uploadPhoto: (product_id: number | string, file: File) => {
    const fd = new FormData();
    fd.append("product_id", String(product_id));
    fd.append("file", file);
    return apiFetch<{ message: string }>("/product/photo/upload", {
      method: "POST",
      body: fd,
      auth: true,
    });
  },

  removePhoto: (photoId: number | string, product_id: number | string) =>
    apiFetch<{ message: string }>(
      `/product/photo/remove?id=${photoId}&product_id=${product_id}`,
      { method: "DELETE", auth: true }
    ),

  bookings: (product_id: number | string) =>
    apiFetch<{ status: number; data: unknown[] }>(
      `/booking-list?product_id=${product_id}`,
      { auth: true }
    ),
};

// --- Categories ---
export const categoriesAPI = {
  list: () => apiFetch<CategoryListResponse>("/category-list"),
};

// --- Wishlist ---
export const wishlistAPI = {
  get: (page = 1, resultsPerPage = 100) => 
    apiFetch<WishlistResponse>(`/wish-list?page=${page}&results_per_page=${resultsPerPage}`, { auth: true }),

  add: (product_id: number | string) =>
    apiFetch<{ message: string }>("/product-add-wishlist", {
      method: "POST",
      body: buildFormData({ product_id }),
      auth: true,
    }),

  remove: (product_id: number | string) =>
    apiFetch<{ message: string }>(`/product-remove-wishlist?product_id=${product_id}`, {
      method: "DELETE",
      auth: true,
    }),
};

// --- Cart ---
export const cartAPI = {
  get: () => apiFetch<CartResponse>("/cart/list", { auth: true }),

  add: (body: any) => {
    // The backend `cart/add` expects dates in DD-MM-YYYY format.
    const reformatDate = (str: string) => {
      if (!str) return str;
      // Input could be YYYY-MM-DD (from HTML date picker)
      const parts = str.split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD -> DD-MM-YYYY
      }
      return str;
    };

    const fullBody = {
      ...body,
      rental_start_date: reformatDate(body.rental_start_date),
      rental_end_date: reformatDate(body.rental_end_date),
    };
    return apiFetch<{ message: string }>("/cart/add", {
      method: "POST",
      body: buildFormData(fullBody),
      auth: true,
    });
  },

  remove: (product_id: number | string) =>
    apiFetch<{ message: string }>(`/cart/remove?product_id=${product_id}`, {
      method: "DELETE",
      auth: true,
    }),
    
  empty: () => 
    apiFetch<{ message: string }>("/cart/flush", {
      method: "DELETE",
      auth: true,
    }),
};

// --- Checkout ---
export const checkoutAPI = {
  createOrder: () =>
    apiFetch<{ message: string; data?: unknown }>("/checkout/create-order", {
      method: "POST",
      auth: true,
    }),

  updateAddress: (body: any) =>
    apiFetch<{ message: string }>("/checkout/update-address", {
      method: "POST",
      body: buildFormData(body),
      auth: true,
    }),

  generatePaymentUrl: (rentedId: string) =>
    apiFetch<{ payment_url: string }>("/checkout/generate-payment-url", {
      method: "POST",
      body: buildFormData({ rented_id: rentedId }),
      auth: true,
    }),

  paymentStatus: (payment_key: string) =>
    apiFetch<{ message: string; data?: unknown }>("/checkout/payment-status", {
      method: "POST",
      body: buildFormData({ payment_key }),
      auth: true,
    }),
};

// --- Rented Products ---
export const rentedAPI = {
  list: (params?: { status?: string; page?: number; results_per_page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("sort", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.results_per_page) qs.set("results_per_page", String(params.results_per_page));
    const q = qs.toString();
    return apiFetch<RentedProductsResponse>(`/rented-list${q ? "?" + q : ""}`, {
      auth: true,
    });
  },

  detail: (rented_id: number | string) =>
    apiFetch<{ status: number; data: RentedProduct }>(
      `/rented-detail?rented_id=${rented_id}`,
      { auth: true }
    ),

  changeStatus: (body: { rented_product_id: string; status: string }) =>
    apiFetch<{ message: string }>("/change-rented-product-status", {
      method: "POST",
      body: buildFormData(body),
      auth: true,
    }),

  transactions: (page = 1) =>
    apiFetch<TransactionsResponse>(`/transactions?page=${page}`, {
      auth: true,
    }),

  transactionDetail: (transaction_id: number | string) =>
    apiFetch<{ status: number; data: Transaction }>(
      `/transaction-detail?transaction_id=${transaction_id}`,
      { auth: true }
    ),
};

// --- Messages ---
export const messagesAPI = {
  list: () => apiFetch<MessagesResponse>("/messages", { auth: true }),

  roomMessages: (room_id: number | string) =>
    apiFetch<{ status: number; data: Message[] }>(`/room-messages?room_id=${room_id}`, {
      auth: true,
    }),

  send: (body: { receiver_id: string; message: string }) =>
    apiFetch<{ message: string }>("/send-message", {
      method: "POST",
      body: buildFormData(body),
      auth: true,
    }),
};

// --- Reviews ---
export const reviewsAPI = {
  list: (product_id: number | string) =>
    apiFetch<ReviewsResponse>(`/reviews?product_id=${product_id}`),

  submit: (body: ReviewSubmitPayload) =>
    apiFetch<{ message: string }>("/submit-product-review", {
      method: "POST",
      body: buildFormData(body),
      auth: true,
    }),
};

// --- Misc ---
export const miscAPI = {
  notifications: () =>
    apiFetch<NotificationsResponse>("/notification-list", { auth: true }),

  commonDropdowns: () =>
    apiFetch<CommonDropdownsResponse>("/common-dropdowns"),

  cleanerList: () => apiFetch<CleanerListResponse>("/cleaner-list"),

  cleanersNearby: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiFetch<CleanerListResponse>(`/cleaners-nearby${qs}`);
  },

  shippingCalculator: (params: Record<string, string>) =>
    apiFetch<unknown>("/shipping-calculator?" + new URLSearchParams(params).toString()),

  faqs: () => apiFetch<FAQResponse>("/faqs"),

  contactUs: (body: ContactUsPayload) =>
    apiFetch<{ message: string }>("/contact-us", {
      method: "POST",
      body: buildFormData(body),
    }),
};

// ============================================================
//  Helper: build FormData from plain object
// ============================================================
export function buildFormData(obj: Record<string, unknown> | object): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      fd.append(key, String(value));
    }
  }
  return fd;
}

// ============================================================
//  Types
// ============================================================

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_type?: string;
  device_token?: string;
  terms_condition?: string;
}

export interface BodyDetailsPayload {
  size: string;
  height: string;
  breast: string;
  waist: string;
  hips: string;
  body_type: string;
}

export interface ContactUsPayload {
  name: string;
  email_address: string;
  subject: string;
  message: string;
}

export interface ReviewSubmitPayload {
  product_id: string | number;
  rating: number;
  title: string;
  comments: string;
}

export interface Transaction {
  id: number;
  rented_product_id?: number;
  amount?: number;
  status?: string;
  payment_key?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface TransactionsResponse {
  status: number;
  data: Transaction[];
}

export interface ReviewsResponse {
  status: number;
  data: Review[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  password_token: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number?: string;
  location?: string;
  profile_image?: string;
  size?: string;
  height?: string;
  waist?: string;
  rating?: number;
  rentals_count?: number;
  listings_count?: number;
  following_count?: number;
  followers_count?: number;
  paypal_email?: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data?: User & { api_token?: string };
}

export interface ProfileResponse {
  status: number;
  data: User;
}

export interface Seller {
  id: number;
  first_name: string;
  last_name: string;
  contact_number?: string;
  location?: string;
  body_type?: string;
  profile_picture?: string;
  profile_picture_custom_size?: string;
  firebase_id?: string;
  body_type_image?: string;
}

export interface ProductSuggestion {
  id: number;
  user_id?: string | number;
  name?: string;
  price?: string | number;
  picture?: string;
  rating?: number;
  added_by?: { id: number; first_name: string; last_name: string };
}

export interface Product {
  id: number;
  uuid?: string;
  user_id?: string | number;
  // Real API field names:
  name?: string;           // product name (API uses 'name')
  picture?: string;        // main image (API uses 'picture')
  price?: string | number;
  is_rented?: boolean;
  rating?: number;
  added_by?: Seller;
  // Extended detail fields from product-detail API:
  color?: string;
  season?: string;
  condition?: string;
  designer?: string;
  retail_price?: string | number;
  alteration?: string;
  cancellation?: string;
  cleaning_price?: string | number | null;
  is_deleted?: string;
  is_professionally_cleaned?: string;
  created_at?: string;
  updated_at?: string;
  unavailable_for_rent_from?: string;
  unavailable_for_rent_to?: string;
  measurement_image?: string;
  product_suggestions?: ProductSuggestion[];
  // Legacy / alternate field names (kept for compatibility):
  title?: string;
  brand?: string;
  size?: string;
  images?: string[];
  thumbnail?: string;
  seo_url?: string;
  category_id?: number;
  category_name?: string;
  description?: string;
  reviews_count?: number;
}

export interface ProductListResponse {
  status: number;
  message?: string;
  data: {
    products: Product[];      // actual API wraps in data.products
    total?: number;
    current_page?: number;
    last_page?: number;
  } | Product[];              // fallback if API shape varies
}

export interface ProductDetailResponse {
  status: number;
  message?: string;
  data: {
    product_detail: Product & {
      product_photos?: { id?: number; sub_photo: string }[];
      reviews?: Review[];
      product_suggestions?: ProductSuggestion[];
    };
  };
}

export interface ProductSearchParams {
  search?: string;         // main search keyword (API uses `search`, not `keyword`)
  category_id?: string;
  size?: string;
  min_price?: string;
  max_price?: string;
  page?: string;
  results_per_page?: string;
}

export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface CategoryListResponse {
  status: number;
  data: Category[];
}

export interface WishlistItem {
  id: number;
  product: Product;
}

export interface WishlistResponse {
  status: number;
  data: WishlistItem[];
}

export interface CartItem {
  id: number;
  product_id: number;
  product_detail: Product & { added_by?: any };
  rental_start_date: string;
  rental_end_date: string;
  total_price: number;
}

export interface CartResponse {
  status: number;
  data: CartItem[];
}

export interface LocalCartItem {
  cart_id: string; // client side unique id
  product_id: number;
  product_detail: Product & { added_by?: any };
  rental_start_date: string;
  rental_end_date: string;
  total_price: number;
}

export const localCartAPI = {
  get: (): LocalCartItem[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("foreal_local_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  add: (item: LocalCartItem) => {
    if (typeof window === "undefined") return;
    const current = localCartAPI.get();
    // Check if already in local cart
    if (!current.some((i) => i.product_id === item.product_id)) {
      current.push(item);
      localStorage.setItem("foreal_local_cart", JSON.stringify(current));
    }
  },
  remove: (productId: string | number) => {
    if (typeof window === "undefined") return;
    const current = localCartAPI.get();
    const updated = current.filter((i) => i.product_id !== Number(productId));
    localStorage.setItem("foreal_local_cart", JSON.stringify(updated));
  },
  empty: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("foreal_local_cart");
  }
};

export interface AddToCartPayload {
  product_id: string | number;
  rental_start_date: string;
  rental_end_date: string;
  delivery_option?: string;
  street_number?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  contact_number?: string;
  country?: string;
}

export interface RentedProduct {
  id: number;
  product: Product;
  status: string;
  rental_start_date: string;
  rental_end_date: string;
  total_price: number;
}

export interface RentedProductsResponse {
  status: number;
  data: RentedProduct[];
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  sender?: User;
}

export interface MessagesResponse {
  status: number;
  data: Message[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user?: User;
  created_at?: string;
}

export interface NotificationsResponse {
  status: number;
  data: { id: number; message: string; created_at: string; read: boolean }[];
}

export interface CommonDropdownsResponse {
  status: number;
  data: {
    sizes?: { id: string; name: string }[];
    heights?: { id: string; name: string }[];
    categories?: Category[];
    [key: string]: unknown;
  };
}

export interface CleanerListResponse {
  status: number;
  data: { id: number; name: string; location?: string }[];
}

export interface FAQResponse {
  status: number;
  data: { id: number; question: string; answer: string }[];
}
