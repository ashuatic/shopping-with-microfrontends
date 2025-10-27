// Configuration versions for backward compatibility

export const appConfigV1 = {
  version: '1.0.0',
  headerConfig: {
    clothing: {
      path: '/shopping/clothing',
      title: 'Clothing'
    },
    electronics: {
      path: '/shopping/electronics',
      title: 'Electronics'
    },
    mobiles: {
      path: '/shopping/mobiles',
      title: 'Mobiles'
    }
  },
  leftNavConfig: {
    profile: {
      path: '/profile',
      title: 'Profile'
    },
    cart: {
      path: '/cart',
      title: 'Cart'
    },
    orders: {
      path: '/orders',
      title: 'Orders'
    }
  },
  secondaryConfig: {
    checkout: {
      path: '/cart/checkout',
      title: 'Checkout'
    },
    payment: {
      path: '/orders/payment',
      title: 'Payment'
    }
  }
};

export const appConfigV2 = {
  version: '2.0.0',
  headerConfig: {
    clothing: {
      path: '/shopping/clothing',
      title: 'Clothing',
      icon: '👔'
    },
    electronics: {
      path: '/shopping/electronics',
      title: 'Electronics',
      icon: '📱'
    },
    mobiles: {
      path: '/shopping/mobiles',
      title: 'Mobiles',
      icon: '📲'
    }
  },
  leftNavConfig: {
    profile: {
      path: '/profile',
      title: 'Profile',
      icon: '👤'
    },
    cart: {
      path: '/cart',
      title: 'Cart',
      icon: '🛒'
    },
    orders: {
      path: '/orders',
      title: 'Orders',
      icon: '📦'
    }
  },
  secondaryConfig: {
    checkout: {
      path: '/cart/checkout',
      title: 'Checkout',
      icon: '💳'
    },
    payment: {
      path: '/orders/payment',
      title: 'Payment',
      icon: '💵'
    }
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#6366F1'
  }
};

export const appConfigV3 = {
  version: '3.0.0',
  headerConfig: {
    clothing: {
      path: '/shopping/clothing',
      title: 'Clothing',
      icon: '👔',
      badge: 'New'
    },
    electronics: {
      path: '/shopping/electronics',
      title: 'Electronics',
      icon: '📱'
    },
    mobiles: {
      path: '/shopping/mobiles',
      title: 'Mobiles',
      icon: '📲',
      badge: 'Hot'
    }
  },
  leftNavConfig: {
    profile: {
      path: '/profile',
      title: 'Profile',
      icon: '👤'
    },
    cart: {
      path: '/cart',
      title: 'Cart',
      icon: '🛒'
    },
    orders: {
      path: '/orders',
      title: 'Orders',
      icon: '📦'
    }
  },
  secondaryConfig: {
    checkout: {
      path: '/cart/checkout',
      title: 'Checkout',
      icon: '💳'
    },
    payment: {
      path: '/orders/payment',
      title: 'Payment',
      icon: '💵'
    }
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#6366F1'
  },
  features: {
    infiniteScroll: true,
    cartPersist: true,
    analytics: true
  }
};

// Version mapping
export const configVersions = {
  '1.0.0': appConfigV1,
  '2.0.0': appConfigV2,
  '3.0.0': appConfigV3
};

