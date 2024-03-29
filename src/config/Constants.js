import {Dimensions} from 'react-native';

export const app_name = 'Cab2U';
export const base_url = 'enter_admin_url/';
export const api_url = 'enter_admin_url/api/';
export const img_url = 'enter_admin_url/public/uploads/';
export const prefix = 'driver/';
export const failed_url = 'paypal_failed';
export const success_url = 'paypal_success';

export const app_settings = prefix + 'app_settings';
export const check_phone = prefix + 'check_phone';
export const login = prefix + 'login';
export const register = prefix + 'register';
export const forgot_password = prefix + 'forgot_password';
export const reset_password = prefix + 'reset_password';
export const change_online_status = prefix + 'change_online_status';
export const vehicle_type_list = prefix + 'vehicle_type_list';
export const dashboard = prefix + 'dashboard';
export const get_heatmap_coordinates = prefix + 'get_heatmap_coordinates';
export const vehicle_update = prefix + 'vehicle_update';
export const get_documents = prefix + 'get_documents';
export const image_upload = 'image_upload';
export const update_document = prefix + 'update_document';
export const get_about = prefix + 'get_about';
export const faq = prefix + 'faq';
export const trip_request_details = prefix + 'trip_request_details';
export const accept = prefix + 'accept';
export const reject = prefix + 'reject';
export const profile_update = prefix + 'profile_update';
export const profile_picture_upload = prefix + 'profile_image_upload';
export const profile_picture_update = prefix + 'profile_picture_update';
export const get_profile = prefix + 'get_profile';
export const trip_details = prefix + 'trip_details';
export const change_trip_status = prefix + 'change_trip_status';
export const trip_cancel = prefix + 'trip_cancel';
export const get_bill = prefix + 'get_bill';
export const my_bookings = prefix + 'my_bookings';
export const add_rating = prefix + 'add_rating';
export const get_notification_messages = prefix + 'get_notification_messages';
export const withdrawal_history = prefix + 'withdrawal_history';
export const withdrawal_request = prefix + 'withdrawal_request';
export const earnings = prefix + 'earnings';
export const tutorials = prefix + 'tutorials';
export const add_wallet = prefix + 'add_wallet';
export const payment_methods = prefix + 'payment_methods';
export const wallet = prefix + 'wallet';
export const update_kyc = prefix + 'update_kyc';
export const get_kyc = prefix + 'get_kyc';
export const privacy_policies = prefix + 'policy';
export const change_driver_settings = prefix + 'change_driver_settings';
export const get_driver_settings = prefix + 'get_driver_settings';
export const get_ongoing_trip_details_shared =
  prefix + 'get_ongoing_trip_details_shared';
export const shared_trip_accept = prefix + 'accept';
export const shared_trip_reject = prefix + 'reject';

//Header configuration for animated view
export const maxHeaderHeight = 200;
export const minHeaderHeight = 60;

//Size
export const screenHeight = Math.round(Dimensions.get('window').height);
export const screenWidth = Math.round(Dimensions.get('window').width);
export const height_40 = Math.round((40 / 100) * screenHeight);
export const height_50 = Math.round((50 / 100) * screenHeight);
export const height_60 = Math.round((60 / 100) * screenHeight);
export const height_35 = Math.round((35 / 100) * screenHeight);
export const height_20 = Math.round((20 / 100) * screenHeight);
export const height_30 = Math.round((30 / 100) * screenHeight);
export const height_17 = Math.round((17 / 100) * screenHeight);

//Map
export const GOOGLE_KEY = 'enter_google_map_key';
export const LATITUDE_DELTA = 0.015;
export const LONGITUDE_DELTA = 0.0152;
export const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};

//Image Path
export const logo = require('.././assets/img/logo.png');
export const success_icon = require('.././assets/img/success.png');
export const id_proof_icon = require('.././assets/img/id_proof_icon.png');
export const vehicle_certificate_icon = require('.././assets/img/vehicle_certificate_icon.png');
export const vehicle_insurance_icon = require('.././assets/img/vehicle_insurance_icon.png');
export const vehicle_image_icon = require('.././assets/img/vehicle_image_icon.png');
export const upload_icon = require('.././assets/img/upload_icon.png');
export const trip_cancel_icon = require('.././assets/img/trip_cancel_icon.png');
export const discount_icon = require('.././assets/img/discount.png');
export const notification_bell = require('.././assets/img/notification-bell.png');
export const bg_img = require('.././assets/img/BG.png');
export const left_arrow = require('.././assets/img/left-arrow.png');
export const right_arrow = require('.././assets/img/right-arrow.png');
export const distance_icon = require('.././assets/img/distance.png');
export const withdrawal_icon = require('.././assets/img/withdrawal.png');
export const wallet_icon = require('.././assets/img/wallet.png');
export const no_data = require('.././assets/img/no_data.png');
export const income_icon = require('.././assets/img/income.png');
export const expense_icon = require('.././assets/img/expense.png');
export const cancel = require('.././assets/img/cancel.png');
export const chat_bg = require('.././assets/img/chat_bg.png');

//json path
export const profile_background = require('.././assets/json/profile_background.json');
export const pin_marker = require('.././assets/json/pin_marker.json');
export const no_favourites = require('.././assets/json/no_favorites.json');
export const btn_loader = require('.././assets/json/btn_loader.json');
export const accept_loader = require('.././assets/json/accept_loader.json');
export const reject_loader = require('.././assets/json/reject_loader.json');
export const loader = require('.././assets/json/loader.json');
export const no_data_loader = require('.././assets/json/no_data_loader.json');
export const location_enable = require('.././assets/json/location_enable.json');
export const app_update = require('.././assets/json/app_update.json');

//Font Family
export const regular = 'GoogleSans-Regular';
export const normal = 'Montreal-Regular';
export const bold = 'Montreal-Bold';

//Font Sized
export const f_tiny = 10;
export const f_xs = 12;
export const f_s = 14;
export const f_m = 16;
export const f_l = 18;
export const f_xl = 20;
export const f_xxl = 22;
export const f_25 = 25;
export const f_30 = 30;
export const f_35 = 35;

export const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

//More Menu
export const menus = [
  {
    menu_name: 'KYC Verification',
    icon: 'files-o',
    route: 'KycVerification',
  },
  {
    menu_name: 'Training',
    icon: 'user',
    route: 'Training',
  },
  {
    menu_name: 'Frequently Asked Questions',
    icon: 'question-circle-o',
    route: 'Faq',
  },
  {
    menu_name: 'Earnings',
    icon: 'dollar',
    route: 'Earnings',
  },
  {
    menu_name: 'Withdrawals',
    icon: 'credit-card',
    route: 'Withdrawal',
  },
  {
    menu_name: 'Wallet Transactions',
    icon: 'money',
    route: 'Wallet',
  },
  {
    menu_name: 'Notifications',
    icon: 'bell',
    route: 'Notifications',
  },
  {
    menu_name: 'About Us',
    icon: 'building-o',
    route: 'AboutUs',
  },
  {
    menu_name: 'Privacy Policies',
    icon: 'info-circle',
    route: 'PrivacyPolicies',
  },
  {
    menu_name: 'Logout',
    icon: 'sign-out',
    route: 'Logout',
  },
];
