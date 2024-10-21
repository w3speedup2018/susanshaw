(function (window, k) {
    if (!window.AppstleMembershipIncluded && (!urlIsProductPage() || 'V1' === 'V2')) {
      window.AppstleMembershipIncluded = true;
      appstleLoadScript = function (src, callback) {
        var script = document.createElement("script");
        script.charset = "utf-8";
        script.async = true;
        script.src = src;
        script.onload = script.onreadystatechange = function () {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = k;
            callback && callback();
          }
        };
        document.getElementsByTagName("head")[0].appendChild(script)
      };
      appstleLoadScript("https://cdn.shopify.com/s/files/1/3098/4704/t/172/assets/appstle-membership.js?v=1684147468");

      window.AM = Window.AM || {};
      AM.Config = {
        "selectors": {
            "payment_button_selectors": "form[action$='/cart/add'] .shopify-payment-button",
            "subscriptionLinkSelector": "",
            "atcButtonPlacement": "BEFORE",
            "subscriptionLinkPlacement": "BEFORE"
        },
        "useUrlWithCustomerId": false,
        "atcButtonSelector": "",
        "moneyFormat": "{% raw %}${{amount_no_decimals}}{% endraw %}",
        "oneTimePurchaseText": "One Time Purchase",
        "shop": "susan-shaw-jewelry.myshopify.com",
        "deliveryText": "delivery",
        "purchaseOptionsText": "Membership Options",
        "manageSubscriptionButtonText": "Manage Membership",
        "subscriptionOptionText": "Join Now",
        "sellingPlanSelectTitle": "DELIVERY FREQUENCY",
        "subscriptionPriceDisplayText": "",
        "tooltipTitle": "Membership detail",
        "api_key": "YeX3mD2qRJVt",
        "showTooltipOnClick": "false",
        "tooltipDesctiption": "<strong>Have complete control of your memberships<\/strong><br\/><br\/>Skip, reschedule, edit, cancel deliveries anytime matching your needs.",
        "tooltipDescriptionOnPrepaidPlan": "<b>Prepaid Plan Details<\/b><\/br> Total price: {{{totalPrice}}} ( Price for every delivery: {{{pricePerDelivery}}})",
        "tooltipDescriptionOnMultipleDiscount": "<b>Discount Details<\/b><\/br> Initial discount is {{discountOne}} and then {{discountTwo}}",
        "tooltipDescriptionCustomization": "{{{defaultTooltipDescription}}} <\/br>  {{{prepaidDetails}}} <\/br> {{{discountDetails}}}",
        "orderStatusManageSubscriptionTitle": "Membership",
        "orderStatusManageSubscriptionDescription": "Continue to your account to view and manage your memberships. Please use the same email address that you used to buy the membership.",
        "orderStatusManageSubscriptionButtonText": "Manage your membership",
        "subscriptionOptionSelectedByDefault" : false,
        "totalPricePerDeliveryText" : "{{{prepaidPerDeliveryPrice}}}\/delivery",
        "memberOnlySellingPlansJson": {},
        "fieldsBySellingPlanId": "{}",
        "rulesByCustomerTag": "{}",
        "membershipByCustomerTag": "{\"annual-club-membership\":[{\"id\":5387,\"shop\":\"susan-shaw-jewelry.myshopify.com\",\"groupName\":\"Annual Club Membership\",\"subscriptionId\":808812759,\"productCount\":0,\"productVariantCount\":0,\"infoJson\":\"{\\\"id\\\":808812759,\\\"productCount\\\":0,\\\"productVariantCount\\\":null,\\\"subscriptionPlans\\\":[{\\\"frequencyCount\\\":1,\\\"frequencyInterval\\\":\\\"YEAR\\\",\\\"billingFrequencyCount\\\":1,\\\"billingFrequencyInterval\\\":\\\"YEAR\\\",\\\"frequencyName\\\":\\\"Annual Club Membership\\\",\\\"discountOffer\\\":15.0,\\\"discountOffer2\\\":null,\\\"afterCycle1\\\":0,\\\"afterCycle2\\\":null,\\\"discountType\\\":\\\"PERCENTAGE\\\",\\\"discountType2\\\":null,\\\"discountEnabled\\\":true,\\\"discountEnabled2\\\":null,\\\"discountEnabledMasked\\\":true,\\\"discountEnabled2Masked\\\":null,\\\"id\\\":\\\"gid:\/\/shopify\/SellingPlan\/3131244759\\\",\\\"frequencyType\\\":\\\"ON_PURCHASE_DAY\\\",\\\"specificDayValue\\\":null,\\\"specificDayEnabled\\\":false,\\\"maxCycles\\\":null,\\\"minCycles\\\":null,\\\"cutOff\\\":0,\\\"prepaidFlag\\\":\\\"false\\\",\\\"idNew\\\":\\\"gid:\/\/shopify\/SellingPlan\/3131244759\\\",\\\"planType\\\":\\\"PAY_AS_YOU_GO\\\",\\\"deliveryPolicyPreAnchorBehavior\\\":\\\"ASAP\\\"}],\\\"groupName\\\":\\\"Annual Club Membership\\\",\\\"productIds\\\":\\\"[]\\\",\\\"productId\\\":null,\\\"variantIds\\\":\\\"[]\\\",\\\"accessoryProductIds\\\":null,\\\"customerTag\\\":\\\"annual-club-membership\\\",\\\"orderTag\\\":\\\"club-members\\\",\\\"rulesJson\\\":null,\\\"formFieldsJson\\\":null}\",\"productIds\":\"\",\"variantIds\":\"\",\"variantProductIds\":\"\",\"customerTag\":\"annual-club-membership\",\"orderTag\":\"club-members\",\"rulesJson\":null,\"formFieldsJson\":null,\"savedSearchId\":null,\"savedSegmentSearchId\":\"gid:\/\/shopify\/Segment\/473866567895\"}]}",
        "nonMemberOnlySellingPlansJson": {},
        "sellingPlansJson": [{"frequencyCount":1,"frequencyInterval":"YEAR","billingFrequencyCount":1,"billingFrequencyInterval":"YEAR","frequencyName":"Annual Club Membership","discountOffer":15.0,"afterCycle1":0,"discountType":"PERCENTAGE","discountEnabled":true,"discountEnabledMasked":true,"id":"gid://shopify/SellingPlan/3131244759","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/3131244759","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false}],
        "widgetEnabled": true,
        "showTooltip" : true,
        "sortByDefaultSequence": false,
        "showSubOptionBeforeOneTime": false,
        "showStaticTooltip": false,
        "showAppstleLink": false,
        "sellingPlanTitleText" : "{{sellingPlanName}} ({{{sellingPlanPrice}}}\/delivery)",
        "oneTimePriceText" : "{{{price}}}",
        "selectedPayAsYouGoSellingPlanPriceText" : "{{{price}}}",
        "selectedPrepaidSellingPlanPriceText" : "{{{pricePerDelivery}}}",
        "selectedDiscountFormat" : "SAVE {{{selectedDiscountPercentage}}}",
        "manageSubscriptionBtnFormat" : "<a href='apps\/memberships' class='appstle_manageSubBtn' ><button class='btn' style='padding: 2px 20px'>Manage Membership<\/button><a><br><br>",
        "manageSubscriptionUrl" : "apps\/memberships",
        "appstlePlanId": 4,
        "showCheckoutSubscriptionBtn": true,
        "disableLoadingJquery": false,
        "enableMessagingForNonMembers": "false",
        "nonMemberMessaging": "Please login to avail the membership perks.",
        "showMembershipBanner": "true",
        "showDiscountWidget": "false",
        "discountBadgeImageLink": "",
        "widgetBadgeImageLink": "",
        "productPagePriceDescriptionBlockPriceSelector": "",
        "productPagePriceDescriptionBlockParentSelector": "",
        "priceBlockSelector": "",
        "parentSelector": "",
        "reBuyEnabled": "false",
        "switchRadioButtonWidget": false,
        "enableAddJSInterceptor": false,
        "css": {
            "appstle_membership_widget": {
                "margin-top": "" ,
                "margin-bottom": "",
            },

            "appstle_membership_wrapper": {
                "border-width": "",
                "border-color": "",
            },

            "appstle_circle": {
                "border-color": "",
            },

            "appstle_dot": {
                "background-color": "",
            },

            "appstle_select": {
                "padding-top": "",
                "padding-bottom": "",
                "padding-left": "",
                "padding-right": "",
                "border-width": "",
                "border-style": "",
                "border-color": "",
                "border-radius": "",
            },

            "tooltip_subscription_svg": {
                "fill": "",
            },

            "appstle_tooltip": {
                "color": "",
                "background-color": "",
            },

            "appstle_tooltip_border_top_color": {
                "border-top-color": "",
            },

            "appstle_membership_final_price": {
                "color": "",
            },
            "appstle_widget_text_color": {
                "color": "",
            },
            "appstle_selected_background": {
                "background": "transparent",
            },
            "customCSS": "",
            "customerPortalCss": "",
            "priceSelector": "",
            "landingPagePriceSelector": "",
            "quickViewClickSelector": "",
            "badgeTop": "",
            "pricePlacement": "BEFORE",
        }
      };

    }

    function urlIsProductPage() {
    // return null != decodeURIComponent(window.location.pathname).match(/\/products\/(([a-zA-Z0-9]|[\-\.\_\~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[\ud83c\ud83d\ud83e][\ud000-\udfff]){1,})\/?/)
    return decodeURIComponent(window.location.pathname).includes('/products/');
    }
  }
)(window);

