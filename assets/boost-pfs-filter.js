if (typeof boostPFSThemeConfig !== 'undefined') {
    // Override Settings
    var boostPFSFilterConfig = {
        general: {
            limit: boostPFSConfig.custom.products_per_page,
            // Optional
            /*  loadProductFirst: false,
              showPlaceholderProductList: false,
              stickyFixTopPos: true,
              separateRefineByFromFilter: true,
              loadPreviousType: 'infinite',
              paginationTypeAdvanced: false,
              activeLoadPreviousPage: false, */
            enableKeepScrollbackPosition: true,
            loadProductFirst: false,
            stickyFixTopPos: true,
            separateRefineByFromFilter: true,
            loadPreviousType: 'infinite',

            enableKeepScrollbackPosition: true, // Scroll to the previous position after going back from Product page
            //keepScrollbackPositionType: 'history',
            // paginationType: boostPFSConfig.custom.pagination_type == 'infinite_scroll' ? 'infinite' :
            // 	(boostPFSConfig.custom.pagination_type == 'load_more' ? 'load_more' : 'default'),
        },
        template: {
            loadMoreLoading: '<div class="boost-pfs-filter-load-more-loading"><div class="load-more__icon" style="width: 44px; height: 44px; opacity: 1;"></div></div>'
        },
        selector: {
            breadcrumb: '.breadcrumb-collection'
        }
    };

    // if(performance.navigation.type == performance.navigation.TYPE_RELOAD){
    //     boostPFSFilterConfig.general.enableKeepScrollbackPosition = false;
    // }
   //console.log('======limit'+ boostPFSFilterConfig.general.limit);
   //console.log('======pagination'+ boostPFSConfig.custom.pagination_type);
}
//alert('test'+boostPFSThemeConfig.custom.products_per_page);

(function() { // Add this
    BoostPFS.inject(this); // Add this
    
    if (Utils.isMobile()) {
        //boostPFSFilterConfig.general.separateRefineByFromFilter = false;
        Selector.filterRefineByHorizontal = '.boost-pfs-filter-refine-by-wrapper-h.is-mobile';
    } else {
        Selector.filterRefineByHorizontal = '.boost-pfs-filter-refine-by-wrapper-h.is-desktop';
    }
    
    // Build Product Grid Item
    ProductGridItem.prototype.compileTemplate = function(data, index) {
        if (!data) data = this.data;
        if (!index) index = this.index + 1;
    
        var currentProduct = data;
    
        /*** Prepare data ***/
        var images = data.images_info;
        if (images.length > 0) {
            data.featured_image = images[0];
        } else {
            data.featured_image = {
                'height': 1,
                'width': 1
            }
        }
        // Displaying price base on the policy of Shopify, have to multiple by 100
        var soldOut = !data.available; // Check a product is out of stock
        var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
        var priceVaries = data.price_min != data.price_max; // Check a product has many prices
        // Get First Variant (selected_or_first_available_variant)
        var firstVariant = data['variants'][0];
        if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
            var paramVariant = data.variants.filter(function(e) {
                return e.id == Utils.getParam('variant');
            });
            if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
        } else {
            for (var iVariants = 0; iVariants < data['variants'].length; iVariants++) {
                if (data['variants'][iVariants].available) {
                    firstVariant = data['variants'][iVariants];
                    break;
                }
            }
        }
        /*** End Prepare data ***/
    
        // Get Template
        var itemHtml = '';
    
       
        /* Start-Boost-143652 */
        var banner1_img = 'https://cdn.shopify.com/s/files/1/1901/8741/files/gardenpartyimg_400x.jpg';
        var banner2_img = 'https://cdn.shopify.com/s/files/1/1901/8741/files/goldengirl_800x.jpg';
        var banner3_img = 'https://cdn.shopify.com/s/files/1/1901/8741/files/bestofblueandwhite_800x.jpg';
        var banner4_img = 'https://cdn.shopify.com/s/files/1/1901/8741/files/weddingguestbest_800x.jpg';
        var collection_ldv = 'https://cdn.shopify.com/s/files/1/3098/4704/files/feat_ldv_v1_800x.jpg';
        var collection_under100 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/feat_giftsunder100_v1_800x.jpg';
        var collection_bridal = 'https://cdn.shopify.com/s/files/1/3098/4704/files/feat_bridal_v1_800x.jpg';
        var m_collection_bridal = 'https://cdn.shopify.com/s/files/1/3098/4704/files/m-_bridalguide_800x.jpg';
        var collection_under50 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/giftsunder50Artboard_2.jpg';
        var m_collection_under50 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/giftsunder50Artboard_1.jpg';
    
        var ldv_banner1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/ldv-banner-1_1200x.jpg'
        var ldv_banner2 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/ldv-banner-2_1200x.jpg'
        var ldv_banner3 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/feat_image-3_800x.jpg'
        var ldv_banner4 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/ldv-banner-4_1200x.jpg'
        var ldv_banner5 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/feat_image-5_800x.jpg'
        var ldv_banner6 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/ldv-banner-6_1200x.jpg'
        var ldv_banner7 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/ldv-banner-7_1200x.jpg'
        var ldv_banner8 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/ldv-banner-8_1200x.jpg'
        var ldv_shell = 'https://cdn.shopify.com/s/files/1/3098/4704/files/lvd-yellow-shell_400x.png'

       
    
        //console.log('index:'+index);
    
        /* Persona Videos */
        const video_css = 'aspect-ratio:4/5;max-height:100%;height:100%;object-fit:cover;';      
        const gardener = 'https://cdn.shopify.com/videos/c/o/v/0da9b2b4d2804d12a35c900c7b74c396.mp4';      
        const gardener1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/gardenerArtboard_2.jpg';
        const m_gardener1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/gardenerArtboard_1.jpg';
        const western = 'https://cdn.shopify.com/videos/c/o/v/6824b47fa2114022b1c52d4be3328e0a.mp4';
        const western1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/collectioncards-westernwomanArtboard_2.jpg';
        const m_western1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/collectioncards-westernwomanArtboard_1.jpg';
        const sunseeker = 'https://cdn.shopify.com/videos/c/o/v/6e66aec1c96845f38c7c329a5d9ea16c.mp4';
        const sunseeker1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/sunseekerArtboard_2.jpg';
        const m_sunseeker1 ='https://cdn.shopify.com/s/files/1/3098/4704/files/sunseekerArtboard_1.jpg';
        const sophisticate = 'https://cdn.shopify.com/videos/c/o/v/77c1b0b2836741bab63161d2c92b8e93.mp4';
        const sophisticate1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/sophisticateArtboard_2.jpg';
        const m_sophisticate1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/sophisticateArtboard_1.jpg';
        const party = 'https://cdn.shopify.com/videos/c/o/v/52e00db6cbfc4f1d91dcd86c92d8c5c0.mp4';
        const party1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/lifeofthepartyArtboard_2.jpg';
        const m_party1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/lifeofthepartyArtboard_1.jpg';
        const old_soul = 'https://cdn.shopify.com/videos/c/o/v/57b3dbc6741a44bb96155cde2d0e2841.mp4';
        const old_soul1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/oldsoulArtboard_2.jpg';
        const m_old_soul1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/oldsoulArtboard_1.jpg?';
        const gal_on_go = 'https://cdn.shopify.com/videos/c/o/v/dc75385c78fc435785a3a0a240782c53.mp4';
        const gal_on_go1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/galonthegoArtboard_2.jpg';
        const m_gal_on_go1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/galonthegoArtboard_1.jpg';
        const jetsetter = 'https://cdn.shopify.com/videos/c/o/v/105310a4339d4363b376ad18f2481e5d.mp4';
        const jetsetter1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/jetsetterArtboard_2.jpg';
        const m_jetsetter1 = 'https://cdn.shopify.com/s/files/1/3098/4704/files/jetsetterArtboard_1.jpg';
        const soiree = 'https://cdn.shopify.com/videos/c/o/v/bd46956251a74b55850c8a35a731b05e.mp4'


        //randomize value 
        //var arrayHTML = [sunseekerHTML,sophisticateHTML, oldsoulHTML];
        //var randomIndexHtml  = Math.floor(Math.random() * arrayHTML.length);
        var sunseekerHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            sunseekerHTML += '<a href="/collections/the-sunseeker">';
            sunseekerHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + sunseeker1 + '" data-srcset="' + sunseeker1 + '" />';
            sunseekerHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_sunseeker1 + '" data-srcset="' + m_sunseeker1 + '" />';
            sunseekerHTML += '</a>';
            sunseekerHTML += '</div>';

        var sophisticateHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            sophisticateHTML += '<a href="/collections/the-sophisticate">';
            sophisticateHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + sophisticate1 + '" data-srcset="' + sophisticate1 + '" />';
            sophisticateHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_sophisticate1 + '" data-srcset="' + m_sophisticate1 + '" />';
            sophisticateHTML += '</a>';
            sophisticateHTML += '</div>';
        var oldsoulHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            oldsoulHTML += '<a href="/collections/the-old-soul">';
            oldsoulHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + old_soul1 + '" data-srcset="' + old_soul1 + '" />';
            oldsoulHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_old_soul1 + '" data-srcset="' + m_old_soul1 + '" />';
            oldsoulHTML += '</a>';
            oldsoulHTML += '</div>'
        var lifeofthepartyHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            lifeofthepartyHTML += '<a href="/collections/life-of-the-party">';
            lifeofthepartyHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + party1 + '" data-srcset="' + party1 + '" />';
            lifeofthepartyHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_party1 + '" data-srcset="' + m_party1 + '" />';
            lifeofthepartyHTML += '</a>';
            lifeofthepartyHTML += '</div>'
        var jetsetterHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            jetsetterHTML += '<a href="/collections/jetsetter">';
            jetsetterHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + jetsetter1 + '" data-srcset="' + jetsetter1 + '" />';
            jetsetterHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_jetsetter1 + '" data-srcset="' + m_jetsetter1 + '" />';
            jetsetterHTML += '</a>';
            jetsetterHTML += '</div>'
        var giftsunder50HTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            giftsunder50HTML += '<a href="/collections/gifts-under-50">';
            giftsunder50HTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + collection_under50 + '" data-srcset="' + collection_under50 + '" />';
            giftsunder50HTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_collection_under50 + '" data-srcset="' + m_collection_under50 + '" />';
            giftsunder50HTML += '</a>';
            giftsunder50HTML += '</div>' 
        var gardenerHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            gardenerHTML += '<a href="/collections/the-gardener">';
            gardenerHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + gardener1 + '" data-srcset="' + gardener1 + '" />';
            gardenerHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_gardener1 + '" data-srcset="' + m_gardener1 + '" />';
            gardenerHTML += '</a>';
            gardenerHTML += '</div>' 
        var galongoHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            galongoHTML += '<a href="/collections/gal-on-the-go">';
            galongoHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + gal_on_go1 + '" data-srcset="' + gal_on_go1 + '" />';
            galongoHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_gal_on_go1 + '" data-srcset="' + m_gal_on_go1 + '" />';
            galongoHTML += '</a>';
            galongoHTML += '</div>' 
        var westernHTML = '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
            westernHTML += '<a href="/collections/western">';
            westernHTML += '<img class="lazyload lazyimage small--hide" width="400" height="400" ' +
            'alt="garden party" src="' + western1 + '" data-srcset="' + western1 + '" />';
            westernHTML += '<img class="lazyload lazyimage medium-up--hide" width="400" height="400" ' +
            'alt="garden party" src="' + m_western1 + '" data-srcset="' + m_western1 + '" />';
            westernHTML += '</a>';
            westernHTML += '</div>'        
          
        if (boostPFSConfig.general.collection_handle.indexOf('the-gardener') !== -1) {         
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+gardener+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('western') !== -1) {           
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+western+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';  
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('the-sunseeker') !== -1) {
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+sunseeker+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('the-sophisticate') !== -1) {        
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+sophisticate+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('life-of-the-party') !== -1) {         
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+party+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('the-old-soul') !== -1) {            
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+old_soul+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('gal-on-the-go') !== -1) {            
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+gal_on_go+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('jetsetter') !== -1) {            
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+jetsetter+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>'; 
            } else if (index == 8) {
                itemHtml += giftsunder50HTML;            
            } else if (index == 14) {
                itemHtml += sunseekerHTML;                         
            } else if (index == 18) {
               itemHtml += sophisticateHTML;
            } else if (index == 24) {
                itemHtml += oldsoulHTML;
            } else if (index == 28) {
                itemHtml += lifeofthepartyHTML;
            } else if (index == 34) {
                itemHtml += jetsetterHTML;
            } else if (index == 38) {
                itemHtml += gardenerHTML;
            }
        }else if (boostPFSConfig.general.collection_handle.indexOf('the-holiday-soiree-collection') !== -1) {            
            if (index == 4) {
                itemHtml += '<div class="product-item lookbook one-fourth column thumbnail thumbnail-hover-enabled--false medium-down--one-half">';
                itemHtml += '<video class="video-wrapper" muted autoplay loop playsinline preload="auto" style="'+video_css+'">';
                itemHtml += '<source src="'+soiree+'" type="video/mp4">';
                itemHtml += ' </video>';             
                itemHtml += '</div>';
            } 
        }else if (boostPFSConfig.general.collection_handle.indexOf('la-dolce-vita') !== -1) {
            if (index == 3) {
                itemHtml += '<div class="product-item lookbook ldv-banner one-half column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="800" height="800" ' +
                    'alt="La Dolce Vita" src="' + ldv_banner1 + '" data-srcset="' + ldv_banner1 + '" />';
                itemHtml += '</div>';
            } else if (index == 7) {
                itemHtml += '<div class="product-item lookbook ldv-shell one-whole column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="400" height="400" ' +
                    'alt="La" src="' + ldv_shell + '" data-srcset="' + ldv_shell + '" />';
                itemHtml += '<h2 class="text-center byronrr-medium">La Dolce Vita is an ode to a bygone era of fantastical grandeur. This camelot of style was notably frozen in time by iconic photographer Slim Aarons, who captured attractive people doing attractive things in attractive places.</h2>';
                itemHtml += '</div>';
            } else if (index == 11) {
                itemHtml += '<div class="product-item lookbook ldv-banner one-half column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="800" height="800" ' +
                    'alt="La Dolce Vita" src="' + ldv_banner2 + '" data-srcset="' + ldv_banner2 + '" />';
                itemHtml += '</div>';
            } else if (index == 17) {
                itemHtml += '<div class="product-item lookbook ldv-quote image-right-wrapper one-whole column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<div class="quotes image-right"><h2 class="text-left byronrr-medium">&ldquo; &nbsp; Designing La Dolce Vita was a nostalgic experience, looking back on my twenties when I was studying art. The influences that first sparked my career are represented in this collection. &rdquo; -Susan</h2><h4 class="text-right"><div><i>on the right</i> Susan and her husband Eric at a University of Texas party in 1967.</div></h4></div>';
                itemHtml += '<img class="lazyload lazyimage" width="400" height="400" ' +
                    'alt="golden girl" src="' + ldv_banner3 + '" data-srcset="' + ldv_banner3 + '" />';
                itemHtml += '</div>';
            } else if (index == 21) {
                itemHtml += '<div class="product-item lookbook ldv-banner one-half column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="800" height="800" ' +
                    'alt="La Dolce Vita" src="' + ldv_banner4 + '" data-srcset="' + ldv_banner4 + '" />';
                itemHtml += '</div>';
            } else if (index == 27) {
                itemHtml += '<div class="product-item lookbook ldv-shell one-whole column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="400" height="400" ' +
                    'alt="La" src="' + ldv_shell + '" data-srcset="' + ldv_shell + '" />';
                itemHtml += '<h2 class="text-center byronrr-medium">During the design process, we found ourselves continously referring to images by Slim Aarons, as he captured the peak of style during this moment in time. When we coincidentally gifted each other his books for Christmas, the collection was further defined.</h2>';
                itemHtml += '</div>';
            } else if (index == 33) {
                itemHtml += '<div class="product-item lookbook ldv-banner one-half column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="800" height="800" ' +
                    'alt="La Dolce Vita" src="' + ldv_banner5 + '" data-srcset="' + ldv_banner5 + '" />';
                itemHtml += '</div>';
            } else if (index == 37) {
                itemHtml += '<div class="product-item lookbook ldv-quote image-left-wrapper one-whole column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="400" height="400" ' +
                    'alt="golden girl" src="' + ldv_banner6 + '" data-srcset="' + ldv_banner6 + '" />';
                itemHtml += '<div class="quotes image-left">';
                itemHtml += '<h2 class="text-left byronrr-medium text-italic">The silhouettes in this collection personify farway places that' +
                    " Slim's &nbsp; &ldquo; holidaymaker &rdquo; subjects frequented, and include design elements from three distinct decades.</h2>";
                itemHtml += '<h4 class="text-right"><i>on the left</i> Susan and her <br /> design team in the studio.</h4>';
                itemHtml += '</div>';
                itemHtml += '</div>';
            } else if (index == 43) {
                itemHtml += '<div class="product-item lookbook ldv-banner one-half column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="800" height="800" ' +
                    'alt="garden party" src="' + ldv_banner7 + '" data-srcset="' + ldv_banner7 + '" />';
                itemHtml += '</div>';
            } else if (index == 47) {
                itemHtml += '<div class="product-item lookbook ldv-quote image-left-wrapper one-whole column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<img class="lazyload lazyimage" width="400" height="400" ' +
                    'alt="golden girl" src="' + ldv_banner8 + '" data-srcset="' + ldv_banner8 + '" />';
                itemHtml += '<div class="quotes image-left"><h2 class="text-left byronrr-medium text-italic">At the heart of this collection is the intention to make everyday something to talk about. These designs are conversation starters while remaining uncomplicated to wear and style. This easy elegance makes even the ordinary weekday feel refined.</h2><h4 class="text-right"><div><i>on the left</i> Susan in the studio</div></h4></div>';
                itemHtml += '</div>';
            } else if (index == 52) {
                itemHtml += '<div class="product-item lookbook back-top one-half column thumbnail thumbnail-hover-enabled--false medium-down--one-whole">';
                itemHtml += '<a href="#pagecontent">';
                itemHtml += '<img class="lazyload lazyimage" width="200" height="200" ' +
                    'alt="garden party" src="' + ldv_shell + '" data-srcset="' + ldv_shell + '" />';
                itemHtml += '</a>';
                itemHtml += '<p><a href="#pagecontent">back to top</a><br /><br /></p>';
                itemHtml += '<p class="shop-all"><a href="/pages/shop-by-collection">see more collections</a></p>';
                itemHtml += '</div>';
            } else {
    
            }
        }else if (
                boostPFSConfig.general.collection_handle.indexOf('ready-to-ship') !== -1 || 
                boostPFSConfig.general.collection_handle.indexOf('mothers-day') !== -1 ||
                boostPFSConfig.general.collection_handle.indexOf('graduation') !== -1 || 
                boostPFSConfig.general.collection_handle.indexOf('kentucky-derby-style') !== -1 || 
                boostPFSConfig.general.collection_handle.indexOf('trending') !== -1 || 
                boostPFSConfig.general.collection_handle.indexOf('in-the-garden') !== -1 || 
                boostPFSConfig.general.collection_handle.indexOf('wedding-shop') !== -1 || 
                boostPFSConfig.general.collection_handle.indexOf('spring-parties') !== -1 
                ) {
            
        }else {
          /* if (index == 4) {
            itemHtml += sunseekerHTML;
          } else if (index == 8) {
            itemHtml += sophisticateHTML;
          } else if (index == 14) {
            itemHtml += oldsoulHTML;
          } else if (index == 18) {
            itemHtml += lifeofthepartyHTML;
          } else if (index == 24) {
            itemHtml += jetsetterHTML;
          } else if (index == 28) {
            itemHtml += giftsunder50HTML;
          } else if (index == 34) {
            itemHtml += gardenerHTML;
          } else if (index == 38) {
            itemHtml += westernHTML;
          } */         
        } 
    
        /* End-Boost-143652 */
        itemHtml += boostPFSTemplate.productGridItemHtml;
    
        var onSaleClass = onSale ? 'sale' : '';
        //var soldOutClass = soldOut ? 'out_of_stock' : 'in_stock';
        //var availabilityProp = soldOut ? 'http://schema.org/SoldOut' : 'http://schema.org/InStock';
    
        // Add custom class
        var itemColumnNumberClass = '';
        var itemCollectionGroupLargeClass = '';
        var itemCollectionGroupMediumClass = '';
        var itemCollectionGroupSmallClass = (index - 1) % 2 == 0 ? 'even' : 'odd';
    
    
        switch (boostPFSConfig.custom.products_per_row) {
            case 2:
                itemColumnNumberClass = 'eight columns';
                break;
            case 3:
                itemColumnNumberClass = 'one-third column';
                break;
            case 4:
                itemColumnNumberClass = 'four columns';
                break;
            case 5:
                itemColumnNumberClass = 'one-fifth column';
                break;
            case 6:
                itemColumnNumberClass = 'one-sixth column';
                break;
            default:
                itemColumnNumberClass = 'one-seventh column';
                break;
        }
    
        if (boostPFSConfig.custom.mobile_products_per_row == 1) {
            itemColumnNumberClass += ' medium-down--one-half small-down--one-whole';
        } else {
            itemColumnNumberClass += ' medium-down--one-half small-down--one-half';
        }
    
        itemHtml = itemHtml.replace(/{{itemColumnNumberClass}}/g, itemColumnNumberClass);
        itemHtml = itemHtml.replace(/{{itemCollectionGroupLargeClass}}/g, itemCollectionGroupLargeClass);
        itemHtml = itemHtml.replace(/{{itemCollectionGroupMediumClass}}/g, itemCollectionGroupMediumClass);
        itemHtml = itemHtml.replace(/{{itemCollectionGroupSmallClass}}/g, itemCollectionGroupSmallClass);
        itemHtml = itemHtml.replace(/{{quickShopStyle}}/g, boostPFSConfig.custom.quick_shop_style);
    
        // Add soldOut label
        var itemSoldOutLabel = soldOut ? boostPFSTemplate.soldOutLabelHtml : '';
        itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabel);
    
        // Add onSale label
        var itemSaleLabel = boostPFSConfig.custom.sale_banner_enabled && onSale ? boostPFSTemplate.saleLabelHtml : '';
        itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabel);
    
        // Add Label (New, Coming soon, Pre order)
        var newLabel = data.collections.filter(function(e) {
            return e.handle == 'new';
        });
        var preorderLabel = data.collections.filter(function(e) {
            return e.handle == 'pre-order';
        });
        var comingsoonLabel = data.collections.filter(function(e) {
            return e.handle == 'coming-soon';
        });
        if (data.collections) {
            var itemNewLabelHtml = typeof newLabel[0] != 'undefined' ? boostPFSTemplate.newLabelHtml : '';
            itemHtml = itemHtml.replace(/{{itemNewLabel}}/g, itemNewLabelHtml);
    
            var itemComingsoonLabelHtml = typeof comingsoonLabel[0] != 'undefined' ? boostPFSTemplate.comingsoonLabelHtml : '';
            itemHtml = itemHtml.replace(/{{itemComingsoonLabel}}/g, itemComingsoonLabelHtml);
    
            var itemPreorderLabelHtml = typeof preorderLabel[0] != 'undefined' ? boostPFSTemplate.preorderLabelHtml : '';
            itemHtml = itemHtml.replace(/{{itemPreorderLabel}}/g, itemPreorderLabelHtml);
        }
    
        var itemHiddenClass = boostPFSConfig.custom.thumbnail_hover_enabled ? 'hidden' : '';
        itemHtml = itemHtml.replace(/{{itemHiddenClass}}/g, itemHiddenClass);
    
        var flipImageClass = boostPFSConfig.custom.secondary_image && images.length > 1 ? 'has-secondary-media-swap' : '';
        itemHtml = itemHtml.replace(/{{flipImageClass}}/, flipImageClass);
    
        //Render image-element
        var itemImagesHtml = buildImageElement(data);
        itemHtml = itemHtml.replace(/{{itemImages}}/g, itemImagesHtml);
    
    
        // Build Product Info when hovering
        var itemProductInfoHoverHtml = '';
        if (boostPFSConfig.custom.thumbnail_hover_enabled || (boostPFSConfig.custom.quick_shop_enabled && boostPFSConfig.custom.quick_shop_style == 'popup')) {
            itemProductInfoHoverHtml = '<div class="thumbnail-overlay">' +
                '<a href="{{itemUrl}}" itemprop="url" class="hidden-product-link">{{itemTitle}}</a>' +
                '<div class="info">' +
                (boostPFSConfig.custom.thumbnail_hover_enabled ? '{{itemProductInfo}}' : '') +
                '</div>' +
                '</div>';
        }
        if (boostPFSConfig.custom.sale_banner_enabled) {
            itemProductInfoHoverHtml += '<div class="price-ui-badges price-ui-badges--' + boostPFSConfig.custom.sticker_style + '">';
            itemProductInfoHoverHtml += '<div class="price-ui-badge price-ui-badge--loading" data-price-ui-badge>' +
                '<noscript>' +
                '<style>' +
                '.price-ui-badge--loading {' +
                '  display: block !important;' +
                '  opacity: 1 !important;' +
                '}' +
                '</style>' +
                '</noscript>';
            if (soldOut) {
                itemProductInfoHoverHtml += '<div class="price-ui-badge__sticker"><span class="price-ui-badge__sticker-text" data-badge>' + boostPFSConfig.label.sold_out + '</span></div>';
            } else if (onSale) {
                itemProductInfoHoverHtml += '<div class="price-ui-badge__sticker"><span class="price-ui-badge__sticker-text" data-badge>' + boostPFSConfig.label.sale + '</span></div>';
            }
            itemProductInfoHoverHtml += '</div>';
            if (boostPFSConfig.general.collection_handle.indexOf('new') !== -1) {
                itemProductInfoHoverHtml += '<div class="price-ui-badge price-ui-badge--new">' +
                    '<div class="price-ui-badge__sticker price-ui-badge__sticker--new">' +
                    '<span class="price-ui-badge__sticker-text price-ui-badge__sticker-text--new">' + boostPFSConfig.label.new + '</span>'
                '</div>' +
                '</div>'
            }
    
            if (boostPFSConfig.general.collection_handle.indexOf('pre-order') !== -1) {
                itemProductInfoHoverHtml += '<div class="price-ui-badge price-ui-badge--new">' +
                    '<div class="price-ui-badge__sticker price-ui-badge__sticker--new">' +
                    '<span class="price-ui-badge__sticker-text price-ui-badge__sticker-text--new">' + boostPFSConfig.label.pre_order + '</span>'
                '</div>' +
                '</div>'
            }
    
            itemProductInfoHoverHtml += '</div>';
        }
        itemHtml = itemHtml.replace(/{{itemProductInfoHover}}/g, itemProductInfoHoverHtml);
    
    
        // Build Product Info (product-info.liquid)
        var itemProductInfoHtml = '<div class="product-details">';
        itemProductInfoHtml += '<span class="title" itemprop="name">{{itemTitle}}</span>';
        itemProductInfoHtml += '{{itemVendor}}';
        itemProductInfoHtml += '{{itemTags}}';
        itemProductInfoHtml += '{{itemReviews}}';
        itemProductInfoHtml += '{{itemPrice}}';
        itemProductInfoHtml += '</div>';
        itemHtml = itemHtml.replace(/{{itemProductInfo}}/g, itemProductInfoHtml);
    
        // Add Vendor
        var itemVendorHtml = '';
        if (boostPFSConfig.custom.vendor_enable) {
            itemVendorHtml = '<span class="brand">' + data.vendor + '</span>';
        }
        itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);
    
        // Add Reviews
        if (typeof Integration === 'undefined' || !Integration.hascompileTemplate('reviews')) {
            var itemReviewHtml = '';
            if (boostPFSConfig.custom.enable_shopify_collection_badges) {
                itemReviewHtml += '<div class="shopify-reviews reviewsVisibility--' + boostPFSConfig.custom.enable_shopify_review_comments + '">';
                itemReviewHtml += '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>';
                itemReviewHtml += '</div>';
            }
            itemHtml = itemHtml.replace(/{{itemReviews}}/g, itemReviewHtml);
        }
    
        // Add Price
        var itemPriceHtml = '';
        if (typeof comingsoonLabel[0] !== 'undefined') {
            itemPriceHtml += '<span class="coming-soon">' + boostPFSConfig.label.coming_soon + '</span>';
        } else {
            itemPriceHtml += '<span class="price ' + onSaleClass + '">';
            if (!soldOut || boostPFSConfig.custom.display_price) {
                itemPriceHtml += '<span class="current_price">';
                if (priceVaries && data.price_min > 0) {
                    itemPriceHtml += '<small><em>' + boostPFSConfig.label.from_price + '</em></small> ';
                }
                if (data.price_min > 0) {
                    if (boostPFSConfig.custom.currency_format == 'money_with_currency_format') {
                        itemPriceHtml += Utils.formatMoney(data.price_min) + ' ' + Globals.defaultCurrency;
                    } else {
                        itemPriceHtml += Utils.formatMoney(data.price_min);
                    }
                } else {
                    itemPriceHtml += boostPFSConfig.label.free_price;
                }
                itemPriceHtml += "</span>";
    
                if (onSale) {
                    if (boostPFSConfig.custom.currency_format == 'money_with_currency_format') {
                        itemPriceHtml += ' <span class="was_price">' + Utils.formatMoney(data.compare_at_price_max) + ' ' + Globals.defaultCurrency + '</span>';
                    } else {
                        itemPriceHtml += ' <span class="was_price">' + Utils.formatMoney(data.compare_at_price_max) + '</span>';
                    }
                }
            }
    
            itemPriceHtml += '<div class="sold-out">';
            if (soldOut) {
                itemPriceHtml += boostPFSConfig.label.sold_out_text;
            }
            itemPriceHtml += ' </div>';
        }
        itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);    
       
        // Add Swatches 
        var itemColorSwatchesHtml = '';
        console.log('======color swatches:'+boostPFSConfig.custom.collection_swatches);
        if (boostPFSConfig.custom.collection_swatches) {
            for (var k = 0; k < data.options.length; k++) {
                var option = data['options'][k];
                var downcasedOption = option.toLowerCase();
                var colorTypes = ['color', 'colour'];
                if (colorTypes.indexOf(downcasedOption) > -1) {
                    var option_index = k;
                    var values = [];
                    itemColorSwatchesHtml += '<div class="collection_swatches">';
                    for (var i = 0; i < data.variants.length; i++) {
                        var variant = data['variants'][i];
                        var value = variant['options'][option_index];
                        if (values.indexOf(value) == -1) {
                            /*
                             var values = values.join(',');
                             values += ',' + value;
                             values = values.split(',');
                             */
                            values.push(value);
                            var fileColorUrl = boostPFSConfig.general.asset_url.replace('boost-pfs.js', Utils.slugify(value) + '.png');
                            fileColorUrl = Utils.optimizeImage(fileColorUrl, '50x');
                            itemColorSwatchesHtml += '<a href="' + Utils.buildProductItemUrl(data) + '?variant=' + variant.id + '" class="swatch" data-swatch-name="meta-' + downcasedOption + '_' + (value.replace(/\s/g, '_')).toLowerCase() + '">';
                            itemColorSwatchesHtml += '<span ';
                            if (boostPFSConfig.custom.products_per_row == 2) {
                                itemColorSwatchesHtml += 'data-image="' + Utils.optimizeImage(variant.image, '600x') + '" ';
                            } else if (boostPFSConfig.custom.products_per_row == 3) {
                                itemColorSwatchesHtml += 'data-image="' + Utils.optimizeImage(variant.image, '500x') + '" ';
                            } else {
                                itemColorSwatchesHtml += 'data-image="' + Utils.optimizeImage(variant.image, '400x') + '" ';
                            }
                            itemColorSwatchesHtml += 'style="background-image: url(' + fileColorUrl + '); background-color: ' + Utils.slugify(value.split(' ').pop()) + ';">';
                            itemColorSwatchesHtml += '</span>';
                            itemColorSwatchesHtml += '</a>';
                        }
                    }
                    itemColorSwatchesHtml += '</div>';
                }
            }
        }
    
        if (!(boostPFSConfig.custom.quick_shop_style == 'inline' && boostPFSConfig.custom.quick_shop_enabled)) {
            itemHtml = itemHtml.replace(/{{itemColorSwatchesInline}}/g, itemColorSwatchesHtml);
        } else {
            console.log('======quick view:'+boostPFSConfig.custom.quick_shop_style);
            itemHtml = itemHtml.replace(/{{itemColorSwatchesInline}}/g, itemColorSwatchesHtml);
        }
    
        /* Start-Boost-143652 */
        /* Swym integration */
    
    
    
        var itemWishlistHtml = '<div class="user-cta is-flex-column">';
        itemWishlistHtml += '<button class="cta-cart quick--shop js-quick-shop-link medium-up--hide" data-id="' + data.id + '" data-url="' + Utils.buildProductItemUrl(data, false) + '"></button>';
        itemWishlistHtml += '<a href="' + Utils.getFeaturedImage(images, '5000x') + '"  class="cta-preview lightbox d-none" data-fancybox="' + data.id + '" rel="product-lightbox" tabindex="-1"></a>';
        itemWishlistHtml += '<button data-with-epi="true" class="swym-button swym-add-to-wishlist-view-product product_' + data.id + '" data-swaction="addToWishlist" data-product-id="' + JSON.stringify(data.id) + '" data-variant-id="' + data.variants[0].id + '" data-product-url="' + boostPFSConfig.shop.url + Utils.buildProductItemUrl(data, false) + '"></button>';
        itemWishlistHtml += '</div>';
        itemHtml = itemHtml.replace(/{{itemWishlist}}/g, itemWishlistHtml);


        var itemQuickViewHtml = '<div class="user-cta-mobile-quickview medium-up--hide">';
        itemQuickViewHtml += '<a class="cta-cart quick--shop js-quick-shop-link medium-up--hide" data-id="' + data.id + '" data-url="' + Utils.buildProductItemUrl(data, false) + '">';
        itemQuickViewHtml += '<img src="https://cdn.shopify.com/s/files/1/3098/4704/files/icon-qv-plus.png">';
        itemQuickViewHtml += '</a>';
        itemQuickViewHtml += '</div>';
        itemHtml = itemHtml.replace(/{{itemQuickView}}/g, itemQuickViewHtml); 
        
    
        /* Tag badges */
        var itemTagsHtml = '';
        var itemTagsHtmlBadges = '';
        var product_tags = data.tags.join(',').toLowerCase();
        var has_custom_tag = false;
        var has_more_colors = false;
        var has_best_seller = false;
        var has_greatgift = false;
        var has_heirloomstyle = false;
        var has_jboxstaple = false;
        var has_susansfavorite = false;
        var has_trending = false;
        var has_limited_edition = false;
    
    
        var custom_tag = '';
        for (var i = 0; i < data.tags.length; i++) {
            var tag = data.tags[i];
            if (tag.indexOf('earring of the month') !== -1) {
                has_custom_tag = true;
            }
            if (tag.indexOf('color') !== -1) {
                has_more_colors = true;
            }
            if (tag.indexOf('best seller') !== -1) {
                has_best_seller = true;
            }
            if (tag.indexOf('greatgift') !== -1) {
                has_greatgift = true;
            }
            if (tag.indexOf('heirloomstyle') !== -1) {
                has_heirloomstyle = true;
            }
            if (tag.indexOf('jboxstaple') !== -1) {
                has_jboxstaple = true;
            }
            if (tag.indexOf('susansfavorite') !== -1) {
                has_susansfavorite = true;
            }         
            if (tag.indexOf('trending') !== -1) {
                has_trending = true;
            }    
            if (tag.indexOf('Label_Limited_Edition') !== -1) {
                has_limited_edition = true;
            }   

        } 
        if (has_custom_tag) {
            itemTagsHtml += '<div class="earring-month">';
            itemTagsHtml += '<div class="ribbon">Earring of the Month</div>';
            itemTagsHtml += '<div class="ribbon-right"></div>';
            itemTagsHtml += '</div>';
        }
        /* if (has_more_colors) {
            itemTagsHtml += '<div class="more-colors">';
            itemTagsHtml += '<div class="ribbon-left"></div>';
            itemTagsHtml += '<div class="ribbon">More Colors</div>';
            itemTagsHtml += '<div class="ribbon-right"></div>';
            itemTagsHtml += '</div>';
        } */
        if (has_best_seller) {
            itemTagsHtml += '<div class="best-seller">';
            itemTagsHtml += '<div class="ribbon-left"></div>';
            itemTagsHtml += '<div class="ribbon">This Week\'s Best Seller</div>';
            itemTagsHtml += '<div class="ribbon-right"></div>';
            itemTagsHtml += '</div>';
        }
    
        if (has_greatgift) {
            itemTagsHtmlBadges += '<div class="product--badges">';
            itemTagsHtmlBadges += '<img src="https://cdn.shopify.com/s/files/1/3098/4704/files/icon-greatgift.svg">';
            itemTagsHtmlBadges += '</div>';
        }
        if (has_heirloomstyle) {
            itemTagsHtmlBadges += '<div class="product--badges">';
            itemTagsHtmlBadges += '<img src="https://cdn.shopify.com/s/files/1/3098/4704/files/icon-heirloomstyle.svg">';
            itemTagsHtmlBadges += '</div>';
        }
        if (has_jboxstaple) {
            itemTagsHtmlBadges += '<div class="product--badges">';
            itemTagsHtmlBadges += '<img src="https://cdn.shopify.com/s/files/1/3098/4704/files/icon-jboxstaple.svg">';
            itemTagsHtmlBadges += '</div>';
        }
        if (has_susansfavorite) {
            itemTagsHtmlBadges += '<div class="product--badges">';
            itemTagsHtmlBadges += '<img src="https://cdn.shopify.com/s/files/1/3098/4704/files/icon-susansfavorite.svg">';
            itemTagsHtmlBadges += '</div>';
        }
        if (has_trending) {
            itemTagsHtmlBadges += '<div class="product--badges">';
            itemTagsHtmlBadges += '<img src="https://cdn.shopify.com/s/files/1/3098/4704/files/icon-trending.svg">';
            itemTagsHtmlBadges += '</div>';
        }
        if (has_limited_edition) {
            itemTagsHtml += '<div class="limited-edition">';
            itemTagsHtml += '<div class="ribbon">Limited Edition</div>';
            itemTagsHtml += '<div class="ribbon-right"></div>';
            itemTagsHtml += '</div>';
        }
    
        itemHtml = itemHtml.replace(/{{itemTagsBadges}}/g, itemTagsHtmlBadges);
        itemHtml = itemHtml.replace(/{{itemTags}}/g, itemTagsHtml);
    
    
        var itemDesktopImageHtml = '';
        if (boostPFSConfig.custom.secondary_image && images.length > 1) {
            var itemFlipImageUrl = images.length > 1 ? Utils.optimizeImage(images[1]['src']) : Utils.getFeaturedImage(images, '900x');
            // Get image source
            var itemFlipImageSrc = 'data-src="' + Utils.optimizeImage(images[1]['src'], '1600x') + '" ';
            itemFlipImageSrc += 'data-srcset=" ' + Utils.optimizeImage(images[1]['src'], '5000x') + ' 5000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '4500x') + ' 4500w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '4000x') + ' 4000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '3000x') + ' 3000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '2000x') + ' 2000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1800x') + ' 1800w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1600x') + ' 1600w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1400x') + ' 1400w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1200x') + ' 1200w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1000x') + ' 1000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '800x') + ' 800w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '600x') + ' 600w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '400x') + ' 400w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '200x') + ' 200w" ';
            // itemImagesHtml += '<div class="image__container">';
            itemDesktopImageHtml += '<a href="{{itemUrl}}"><div class="image-element__wrap" style="width:';
            if (images.length > 1) {
                itemDesktopImageHtml += images[1]['width'] + 'px">';
            } else {
                itemDesktopImageHtml += data.featured_image.width + 'px">';
            }
            itemDesktopImageHtml += '<img src="' + itemFlipImageUrl + '" ';
            itemDesktopImageHtml += 'class="custom_primry lazyload transition--blur-up secondary lazypreload lazyautosizes secondary-media-hidden" alt="{{itemTitle}}" data-sizes="auto" ' + itemFlipImageSrc + '/>';
            itemDesktopImageHtml += '</div></a>';
        }
        itemHtml = itemHtml.replace(/{{itemDesktopImage}}/g, itemDesktopImageHtml);
        /* End-Boost-143652 */
    
        // Add main attribute
        itemHtml = itemHtml.replace(/{{index}}/g, index);
        itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
        itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
        itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
        itemHtml = itemHtml.replace(/{{itemUrl}}/g, buildCustomSelectedVariantUrl(currentProduct));
        // show variant product on search template/ instant search only
        if (boostPFSConfig.general.template !== 'search' && data.hasOwnProperty('variant_id') && !Globals.hasFilterOptionParam) {
            return ''
        } else {
            return itemHtml;
        }
    
    };
    
    // Build Image Element image-element
    //{% render 'image-element' %} -- product-thumbnail.liquid
    function buildImageElement(data) {
    
        var searchedVariant = getMatchedVariantImage(data);
        //console.log(searchedVariant) 
        if (Utils.getSearchTerm() !== null) {
            if (searchedVariant) {
                var variantImage = searchedVariant.image;
            } else {
                var variantImage = data.images_info[0].src;
            }
        } else {
            var variantImage = data.images_info[0].src;
        }
        // var variantImage = data.images_info[0].src;
    
        var images = data.images_info;
        var maxHeight = boostPFSConfig.custom.collection_height;
        var imageWidth = 900,
            imageHeight = 900;
        if (images.length > 0) {
            imageWidth = data.featured_image.width;
            imageHeight = data.featured_image.height;
        }
    
    
    
        var lowQualityImage = null;
        if (boostPFSConfig.custom.image_loading_style == 'blur-up') {
            lowQualityImage = Utils.optimizeImage(variantImage, '50x');
        }
    
        var backgroundColor = '';
        var crop_to_aspect_ratio = '';
        if (boostPFSConfig.custom.image_loading_style == 'color') {
            var dominantColorImage = Utils.optimizeImage(variantImage, '1x');
    
            var object_fit = boostPFSConfig.custom.align_height;
            if (object_fit) {
                crop_to_aspect_ratio = 'max-height: ' + maxHeight + 'px; width: calc(' + imageWidth + ' /  ' + imageHeight + ' * ' + maxHeight + 'px);';
            }
    
            backgroundColor = 'background: url(' + dominantColorImage + ');';
        }
    
        // Get Thumbnail url
        var itemThumbUrl = Utils.optimizeImage(variantImage, boostPFSConfig.custom.image_loading_style == 'blur-up' ? '50x' : '100x');
    
        // Get image source
        var itemImageSrc = '';
        if (lowQualityImage) {
            itemImageSrc += 'src="' + lowQualityImage + '"';
        }
        itemImageSrc += 'data-src="' + Utils.optimizeImage(variantImage, '1600x') + '" ';
        itemImageSrc += 'data-srcset=" ' + Utils.optimizeImage(variantImage, '5000x') + ' 5000w,';
        itemImageSrc += Utils.optimizeImage(variantImage, '4500x') + ' 4500w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '4000x') + ' 4000w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '3500x') + ' 3500w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '3000x') + ' 3000w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '2000x') + ' 2000w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '1800x') + ' 1800w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '1600x') + ' 1600w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '1400x') + ' 1400w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '1200x') + ' 1200w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '1000x') + ' 1000w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '800x') + ' 800w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '600x') + ' 600w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '400x') + ' 400w, ';
        itemImageSrc += Utils.optimizeImage(variantImage, '200x') + ' 200w" ';
    
        // Get Flip image url
        var itemFlipImageUrl = images.length > 1 ? Utils.optimizeImage(images[1]['src']) : Utils.optimizeImage(variantImage, '900x');
    
    
        // Compile Template
        var itemImagesHtml = '<div class="image__container ' + (images.length > 1 ? 'mobile-slider' : '') + '">';
        itemImagesHtml += '<a href="{{itemUrl}}"><div class="image-element__wrap" style="' + backgroundColor + ' ' + crop_to_aspect_ratio + ((!object_fit) ? 'max-width: ' + imageWidth + 'px;' : '') + '">';
        itemImagesHtml += '<img ' +
            ' alt="{{itemTitle}}" ' +
            ' data-sizes="auto" ' +
            ' data-aspectratio="' + 4000 / 5000 + '" ' +
            ' height="' + imageHeight + '" ' +
            ' width="' + imageWidth + '" ' +
            ' style="" ' +
            ' class="custom_primry lazyload transition--' + boostPFSConfig.custom.image_loading_style + '"' +
            ' srcset="data:image/svg+xml;utf8,<svg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'' + imageWidth + '\'%20height=\'' + imageHeight + '\'></svg>" ' +
            itemImageSrc + '/>';
        itemImagesHtml += '</div></a>';
        // itemImagesHtml += '<noscript>';
        // itemImagesHtml += '<img src="' + Utils.getFeaturedImage(images, '2000x') + '" alt="{{itemTitle}}" class="noscript">';
        // itemImagesHtml += '</noscript>';
    
        // Add Flip Image
        if (boostPFSConfig.custom.secondary_image && images.length > 1) {
            // Get image source
            var itemFlipImageSrc = 'data-src="' + Utils.optimizeImage(images[1]['src'], '1600x') + '" ';
            itemFlipImageSrc += 'data-srcset=" ' + Utils.optimizeImage(images[1]['src'], '5000x') + ' 5000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '4500x') + ' 4500w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '4000x') + ' 4000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '3000x') + ' 3000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '2000x') + ' 2000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1800x') + ' 1800w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1600x') + ' 1600w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1400x') + ' 1400w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1200x') + ' 1200w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '1000x') + ' 1000w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '800x') + ' 800w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '600x') + ' 600w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '400x') + ' 400w, ';
            itemFlipImageSrc += Utils.optimizeImage(images[1]['src'], '200x') + ' 200w" ';
            // itemImagesHtml += '<div class="image__container">';
            itemImagesHtml += '<a href="{{itemUrl}}"><div class="image-element__wrap medium-up--hide m-secondary-image " style="width:';
            if (images.length > 1) {
                itemImagesHtml += images[1]['width'] + 'px">';
            } else {
                itemImagesHtml += data.featured_image.width + 'px">';
            }
            itemImagesHtml += '<img src="' + itemFlipImageUrl + '" ';
            itemImagesHtml += 'class="custom_primry lazyload transition--blur-up secondary lazypreload lazyautosizes medium-up--hide m-secondary-image" alt="{{itemTitle}}" data-aspectratio="4000/5000" data-sizes="auto" ' + itemFlipImageSrc + '/>';
            itemImagesHtml += '</div></a>';
        }
        itemImagesHtml += '</div>';
        return itemImagesHtml;
    }
    
    // Build Pagination
    ProductPaginationDefault.prototype.compileTemplate = function(totalProduct) {
        // Get page info
        if (!totalProduct) totalProduct = this.totalProduct;
        var currentPage = parseInt(Globals.queryParams.page);
        var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);
    
        if (totalPage > 1) {
            var paginationHtml = boostPFSTemplate.paginateHtml;
    
            // Build Previous
            var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousHtml : '';
            previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
            paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
    
            // Build Next
            var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextHtml : '';
            nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
            paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
    
            // Create page items array
            var beforeCurrentPageArr = [];
            for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
                beforeCurrentPageArr.unshift(iBefore);
            }
            if (currentPage - 4 > 0) {
                beforeCurrentPageArr.unshift('...');
            }
            if (currentPage - 4 >= 0) {
                beforeCurrentPageArr.unshift(1);
            }
            beforeCurrentPageArr.push(currentPage);
    
            var afterCurrentPageArr = [];
            for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
                afterCurrentPageArr.push(iAfter);
            }
            if (currentPage + 3 < totalPage) {
                afterCurrentPageArr.push('...');
            }
            if (currentPage + 3 <= totalPage) {
                afterCurrentPageArr.push(totalPage);
            }
    
            // Build page items
            var pageItemsHtml = '';
            var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
            for (var iPage = 0; iPage < pageArr.length; iPage++) {
                if (pageArr[iPage] == '...') {
                    pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
                } else {
                    pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
                }
                pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
                pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
            }
            paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
    
            return paginationHtml;
        }
        return '';
    };
    
    ProductPaginationLoadMore.prototype.compileTotalTemplate = function() {
  
        /**
         * If enable the Load previous feature and the evnet type is page:
         * => Get the next loading page is from session storage OR get the next loading page from query param
         */
        if (Utils.isLoadPreviousPagePaginationType() && this.parent.eventType == 'page') {
            this.nextPage = parseInt(window.sessionStorage.getItem(this.settings.sessionStorageCurrentNextPage));
        } else {
            this.nextPage = Globals.queryParams.page;
        }
        // Set from index
        var from = (this.nextPage - 1) * Globals.queryParams.limit + 1;
        if (jQ(Selector.products + ' > div').length) {
            from -= jQ(Selector.products + ' > div').length - Globals.queryParams.limit;
        }
        // Set to index
        var product_index = (this.nextPage - 1) * Globals.queryParams.limit + 1;
        var to = product_index + this.data.products.length - 1;
        this.toProduct = to;
    
        return this.getTemplate('total')
            .replace(/{{progressLabel}}/g, Labels.loadMoreTotal)
            .replace(/{{ from }}/g, from)
            .replace(/{{ to }}/g, to)
            .replace(/{{ total }}/g, this.totalProduct)
            .replace(/{{class.productLoadMore}}/g, Class.productLoadMore)
    };
    
    // Build Sorting
    ProductSorting.prototype.compileTemplate = function() {
        if (boostPFSTemplate.hasOwnProperty('sortingHtml')) {
    
            var sortingArr = Utils.getSortingList();
    
    
            if (sortingArr) {
    
                // Build content
                var sortingItemsHtml = '';
                for (var k in sortingArr) {
                    if (sortingArr.hasOwnProperty(k)) {
                        sortingItemsHtml += '<option value="' + k + '">' + sortingArr[k] + '</option>';
                    }
                }
    
                return boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
            }
        }
        return '';
    };
    
    // Sorting render
    ProductSorting.prototype.render = function() {
        jQ(Selector.topSorting).html(this.compileTemplate());
        var $selectInput = jQ(Selector.topSorting);
        if ($selectInput.length) {
            $selectInput.val(Globals.queryParams.sort);
        }
    };
    
    // Build Sorting event
    ProductSorting.prototype.bindEvents = function() {
        //var _this = this;
        jQ(Selector.topSorting).off('change');
        jQ(Selector.topSorting).change(function(e) {
            // Append "sort" param to url
            // Used to Scroll to the previous position after returning from Product page
            FilterApi.setParam('sort', jQ(this).val());
            FilterApi.setParam('page', 1);
            FilterApi.applyFilter('sort');
    
            //scroll into View
            if (Utils.isMobile()) {
                var scrolltoMain = document.querySelector("#main-content-wrapper");
                //window.scrollTo({ top: scrolltoMain, behavior: 'smooth'});   
                jQuery('html,body').animate({
                    scrollTop: '220'
                }, 1500);
    
            }
    
        });
    };
    
    // Build Breadcrumb
    Breadcrumb.prototype.compileTemplate = function(colData) {
        if (!colData) colData = this.collectionData;
        if (typeof colData !== 'undefined' && colData.hasOwnProperty('collection')) {
            var colInfo = colData.collection;
    
            var breadcrumbHtml = '<span ><a href="' + boostPFSConfig.shop.url + '" title="' + boostPFSConfig.shop.name + '" class="breadcrumb_link"><span>' + boostPFSConfig.label.breadcrumb_home + '</span></a></span> ';
            breadcrumbHtml += '<span class="breadcrumb-divider">/</span> ' +
                '<span><a href="{{currentCollectionLink}}" title="{{currentCollectionTitle}}" class="breadcrumb_link"><span>{{currentCollectionTitle}}</span></a></span> ';
            // Build Tags
            var currentTagsHtml = '';
            if (Array.isArray(boostPFSConfig.general.current_tags)) {
                var current_tags = boostPFSConfig.general.current_tags;
                for (var k = 0; k < current_tags.length; k++) {
                    var tag = current_tags[k];
                    currentTagsHtml += '<span class="breadcrumb-divider">/</span>';
                    currentTagsHtml += '<span><a href="/collections/{{currentCollectionLink}}/' + Utils.slugify(tag) + '" title="' + tag + '"><span>' + tag + '</span></a></span>';
                }
            }
            breadcrumbHtml += currentTagsHtml;
            // Build Collection Info
            breadcrumbHtml = breadcrumbHtml.replace(/{{currentCollectionLink}}/g, '/collections/' + colInfo.handle).replace(/{{currentCollectionTitle}}/g, colInfo.title);
            // Top Pagination
            breadcrumbHtml += ' <span class="boost-pfs-filter-top-pagination"></span>';
            return breadcrumbHtml;
        }
        return '';
    };
    
    // Call Theme function to Build additional elements for Product list
    ProductList.prototype.afterRender = function(data) {
        // Build Quick view data
        if (!data) data = this.data;
    
        document.dispatchEvent(new CustomEvent("swym:collections-loaded"));
    
        if (Utils.isMobile()) {
            jQ('.product-image-wrap').each(function(e) {
                var imageWrapWidth = jQ(this).width();
                jQ(this).find('.image__container,.carousel-cell').height(imageWrapWidth);
            });
            $('.mobile-slider').flickity({
                wrapAround: true,
                pageDots: true,
                prevNextButtons: false,
                groupCells: 1,
                cellAlign: 'left',
                imagesLoaded: true
            });
            jQ(".m-secondary-image").addClass("pageloaded");
        }
    
        if (boostPFSConfig.custom.quick_shop_enabled) {
            console.log('======quick view enable');
            // this.buildExtrasProductListByAjax(data, 'boost-pfs-quickview', function(results) {
            //   results.forEach(function(result) {
                // var element = '';
                // if (boostPFSConfig.custom.quick_shop_style == 'inline') {
                //   element = jQ('[data-boost-theme-quickview="' + result.id + '"]');
                //   if (element.find('.js-quick-shop-link').length == 0) {
                //     element.append(result.quickview);
                //   }
                // } else {
                //   element = jQ('[data-boost-theme-quickview="' + result.id + '"] div.info');
                //   if (element.find('.js-quick-shop-link').length == 0) {
                //     element.append(result.quickview);
                //   }
                // }
            //   });
            //   buildTheme();
            // });
          
            var count = 0;
            var hasShopifyRoutes = Shopify && Shopify.routes && typeof Shopify.routes.root != 'undefined';
            var localeURLPart = "";
    
            if (hasShopifyRoutes) {
                localeURLPart = Shopify.routes.root.replace(/\/$/, '');
            }
    
            for (var i = 0; i < data.length; i++) {
                const prodId = data[i]['id'];
                quickUrl = localeURLPart + '/products/' + data[i].handle + '?view=boost-pfs-integration';
                jQ.ajax({
                    url: quickUrl,
                    success: function(result) {
                        try {
                            var res = JSON.parse(result);

                            var element = '';
                            if (boostPFSConfig.custom.quick_shop_style == 'inline') {
                                element = jQ('[data-boost-theme-quickview="' + res.id + '"]');
                                if (element.find('.js-quick-shop-link').length == 0) {
                                    element.append(res.quickview.trim());
                                }
                            } else {
                                element = jQ('[data-boost-theme-quickview="' + res.id + '"] div.info');
                                if (element.find('.js-quick-shop-link').length == 0) {
                                    element.append(res.quickview.trim());
                                }
                            }
                            count++;

                            if (count == data.length) buildTheme();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            }
        }
    };
    
    // Build Additional elements
    Filter.prototype.afterRender = function(data) {
        if (!data) data = this.data;
    
        //Check for refined items and click event
        if (Utils.isMobile()) {
            var refinedCounter = jQ('.boost-pfs-filter-refine-by-items').find('.refine-by-item').length;
            var refinedItem = jQ('.boost-pfs-filter-refine-by-items').find('.refine-by-item');
            var scrolltoMain = document.querySelector("#main-content-wrapper");
    
            jQ('.boost-pfs-filter-tree-mobile-button').find('.refined-counter').remove();
            if (refinedCounter > 0) {
                jQ('.boost-pfs-filter-tree-mobile-button').find('.boost-pfs-filter-tree-mobile-button-label').append('<span class="refined-counter"> (' + refinedCounter + ')</span>');
    
                refinedItem.on('click', function() {
    
                    //window.scrollTo({ top: scrolltoMain, behavior: 'smooth'});   
                    jQuery('html,body').animate({
                        scrollTop: '220'
                    }, 1500);
                    //console.log('======clicked');
    
                })
    
            }
        }
    
        // Remove InstantClick
        jQ(Selector.filterTree).find('a').attr('data-no-instant', '');
    
        // Remove product wrapper
        /*
        if (jQ(Selector.products).children().hasClass('product-list')) {
          jQ(Selector.products).children().children().unwrap();
        }
        */
    
        // Build top pagination
        var totalPage = Math.ceil(data.total_product / Globals.queryParams.limit);
        var topPaginationHtml = '<span class="breadcrumb-divider">/</span> ' + (boostPFSConfig.label.breadcrumb_page).replace(/{{ current_page }}/g, Globals.queryParams.page).replace(/{{ pages }}/g, totalPage);
        jQ('.boost-pfs-filter-top-pagination').html(topPaginationHtml);
        jQ(".load-more__icon").remove();
    
    
    
        //Build Clear All
        jQ('.boost-pfs-filter-close span').append(this.filterTrees[0].clearAllButton.$element);
    
        //Add Custom Buttons 
        var m_filterBtn = jQuery('.boost-pfs-filter-tree-mobile-button');
        var m_filter = jQuery('#boost-pfs-filter-tree'),
            m_header = m_filter.find('.boost-pfs-filter-mobile-toolbar-top'),
            m_footer = m_filter.find('.boost-pfs-filter-mobile-footer'),
            m_filterClearAllOrig = m_filter.find('.boost-pfs-filter-refine-by-wrapper .boost-pfs-filter-clear-all'),
            m_filterBackBtnOrig = m_filter.find('.boost-pfs-filter-mobile-toolbar-items .boost-pfs-filter-back-btn');
        //m_filterApplyOrig = m_filter.find('.boost-pfs-filter-mobile-footer .boost-pfs-filter-back-btn');
    
    
    
        //Check how many filters
    
        var _count = 0;
    
        this.filterTrees[0].filterOptions.forEach(function(filterOption) {
            // FilterOption has numberAppliedFilterItems field. We add those up.
            _count += filterOption.numberAppliedFilterItems;
        });
    
    
        //check if element exist before appending
        if (m_header.find('.m_filter-back').length === 0) {
            m_header.append('<span class="m_filter-back boost-pfs-filter-back-btn">Back</span>');
            //console.log('=====not exist1');
        }
    
        if (m_footer.find('.m_filter-back').length === 0) {
            m_footer.prepend('<button class="m_filter-back boost-pfs-filter-back-btn"><span>Back</span></button>');
            //console.log('=====not exist2');
        }
    
        if (m_footer.find('.m_filter-apply').length === 0 && _count !== 0) {
            m_footer.prepend('<button class="m_filter-apply boost-pfs-filter-back-btn show-btn"><span>Apply</span></button>');
            //console.log('=====not exist3');
        }
    
        //m_footer.append('<span class="m_filter-apply boost-pfs-filter-back-btn">Apply</span>');
    
        //console.log('========tree'+m_filter.attr('class'));       
    
        var m_filterbackbtn = m_filter.find('.boost-pfs-filter-mobile-toolbar-top .m_filter-back'),
            m_filterClearBtn = m_filter.find('.boost-pfs-filter-close span'),
            m_filterBackBtnBot = m_filter.find('.boost-pfs-filter-mobile-footer .m_filter-back'),
            m_filterApplyBtn = m_filter.find('.boost-pfs-filter-mobile-footer .m_filter-back');
    
    
    
        //Bind with default Back Button
        m_filterbackbtn.on('click', function() {
            m_filterBackBtnOrig.trigger("click");
            //console.log('========clicked'+m_filterBackBtnOrig.attr('class'));
        });
    
        m_filterBackBtnBot.on('click', function() {
            m_filterBackBtnOrig.trigger("click");
            //console.log('========clicked'+m_filterBackBtnOrig.attr('class'));
        });
    
    
    
        //Bind with default Clear All Button
        m_filterClearBtn.on('click', function(e) {
            e.preventDefault();
            m_filterClearAllOrig.trigger("click");
            //console.log('========clicked'+m_filterClearAllOrig.attr('class')); 
        });
    
    
        //Remove the unused Best Selling    
        /*  var curr_url = window.location.href;    
          var best_selling_option =  jQ('.boost-pfs-filter-top-sorting option[value="best-selling"]');
          if( curr_url.indexOf('search') !== -1 ){           
            console.log('=====best selling'+best_selling_option.attr('class'));
            best_selling_option.addClass('hide');    
          }else{
            best_selling_option.remove();    
          } */
    
        buildTheme();
    };
    
    function buildTheme() {
        // From Turbo 7.0.1, using window.PXUTheme instead of Shopify.theme_settings
        if (typeof Shopify.theme_settings !== "undefined") {
            if ((Shopify.theme_settings.enable_shopify_review_comments || Shopify.theme_settings.enable_shopify_collection_badges) && window.SPR) {
                SPR.registerCallbacks();
                SPR.initRatingHandler();
                SPR.initDomEls();
                SPR.loadProducts();
                SPR.loadBadges();
            }
            if (Shopify.theme_settings.show_multiple_currencies && typeof convertCurrencies == 'function') {
                convertCurrencies();
            }
    
            if (Shopify.theme_settings.quick_shop_enabled &&
                typeof quickShop != 'undefined' &&
                typeof quickShop.init == 'function') {
                quickShop.init();
            }
        } else {
            if (window.PXUTheme && window.PXUTheme.hasOwnProperty('theme_settings')) {
                if ((window.PXUTheme.theme_settings.enable_shopify_review_comments || window.PXUTheme.theme_settings.enable_shopify_collection_badges) && window.SPR) {
                    if ($('#shopify-product-reviews').length >= 1) {
                        SPR.$(document).ready(function() {
                            return SPR.registerCallbacks(),
                                SPR.initRatingHandler(),
                                SPR.initDomEls(),
                                SPR.loadProducts(),
                                SPR.loadBadges()
                        })
                    }
                }
                if (window.PXUTheme.currency.show_multiple_currencies || window.PXUTheme.currency.native_multi_currency) {
                    window.currencyConverter.init();
                }
                if (window.PXUTheme.quick_shop_enabled &&
                    typeof window.quickShop != 'undefined' &&
                    typeof window.quickShop.init == 'function') {
                    window.quickShop.init();
                }
            }
        }
    
        if (typeof imageFunctions != 'undefined' && typeof imageFunctions.showSecondaryImage == 'function') {
            imageFunctions.showSecondaryImage();
        }
    
        // Initialize shopify payment buttons
        if (Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
        }
    
        if (typeof productPage != 'undefined' && typeof productPage.init == 'function') {
            productPage.init();
        }
    
        if (typeof hideNoScript == 'function') {
            hideNoScript();
        }
    }
    
    /* start-boost-custom */
    /* #148001 */
    function getMatchedVariantImage(data) {
        var searchTerm = Utils.getSearchTerm();
        var searchVariant = data.variants;
        if (searchTerm !== null) {
            for (var i = 0; i < searchVariant.length; i++) {
                var variantTitle = searchVariant[i].title.toLowerCase();
                searchTerm = searchTerm.replace(/\*/g, '');
                var searchTermArray = searchTerm.toLowerCase().split(" ");
                for (var j = 0; j < searchTermArray.length; j++) {
                    if (variantTitle.includes(searchTermArray[j])) {
                        if (searchVariant[i].image !== null && searchVariant[i].image !== '') {
                            return searchVariant[i];
                        }
                    }
                }
            }
        }
        return false;
    }
    
    function buildCustomSelectedVariantUrl(crdata) {
        var searchTerm = Utils.getSearchTerm();
        var searchVariant = crdata.variants;
        if (searchTerm !== null) {
            for (var i = 0; i < searchVariant.length; i++) {
                var variantTitle = searchVariant[i].title.toLowerCase();
                searchTerm = searchTerm.replace(/\*/g, '');
                var searchTermArray = searchTerm.toLowerCase().split(" ");
                for (var j = 0; j < searchTermArray.length; j++) {
                    if (variantTitle.includes(searchTermArray[j])) {
                        if (crdata.variant_id) {
                            return Utils.buildProductItemUrl(crdata) + '?variant=' + crdata.variant_id;
                        } else {
                            return Utils.buildProductItemUrl(crdata) + '?variant=' + searchVariant[i].id;
                        }
                    }
                }
            }
        }
        if (crdata.variant_id) {
            return Utils.buildProductItemUrl(crdata) + '?variant=' + crdata.variant_id;
        } else {
            return Utils.buildProductItemUrlWithVariant(crdata);
        }
    }
    
    if (jQ(window).width() > 767) {
        var checkExist = setInterval(function() {
            if (jQ('.boost-pfs-filter-tree-desktop-button-icon').length) {
                jQ('.boost-pfs-filter-tree-desktop-button button').trigger('click');
                clearInterval(checkExist);
            }
        }, 100);
    }
    
    /*  jQuery('.boost-pfs-filter-collection-description').readmore({
       speed: 80,
       lessLink: '<a href="#">Read less</a>'
     });*/
    
    CollectionItem.prototype.compileTemplate = function() {
        var collectionLink = '/collections/' + this.data.handle;
        var itemThumb = '';
        var itemThumbSrc = '';
        var itemDesc = ''
    
        if (this.displayImage) {
            // Get the collection thumbnail
            if (this.data.image && this.data.image.hasOwnProperty('src') && this.data.image.src !== '') {
                itemThumbSrc = Utils.optimizeImage(this.data.image.src, '800x');
            }
            // Build the collection thumbnail
            if (itemThumbSrc.length > 0) {
                itemThumb = this.getTemplate(CollectionItemList.Enum.tempType.IMAGE);
            }
        }
    
        if (this.displayDescription && this.data.body_html && typeof this.data.body_html === 'string') {
            let bodyHtml = Utils.stripHtml(this.data.body_html);
            if (bodyHtml.length > 264) bodyHtml = bodyHtml.substr(0, Settings.getSettingValue('search.collectionDescLimitCharacter')) + '...';
            itemDesc = this.getTemplate(CollectionItemList.Enum.tempType.DESCRIPTION).replace(/{{itemDescription}}/g, bodyHtml);
        }
    
        return this.getTemplate()
            .replace(/{{itemThumbnail}}/g, itemThumb)
            .replace(/{{itemThumbSrc}}/g, itemThumbSrc)
            .replace(/{{itemDesc}}/g, itemDesc)
            .replace(/{{class.filterResultItem}}/g, Class.filterResultItem)
            .replace(/{{itemUrl}}/g, collectionLink)
            .replace(/{{itemTitle}}/g, Utils.stripHtml(this.data.title));
    }
    
    PageItem.prototype.compileTemplate = function() {
        var pageUrl = this.data.hasOwnProperty('url') ? this.data.url : '#';
        var itemThumb = '';
        var itemThumbSrc = '';
        var itemExcerpt = '';
    
        if (this.displayImage) {
            // Get the page thumbnail url
            if (this.data.image && this.data.image.hasOwnProperty('src') && this.data.image.src !== '') {
                itemThumbSrc = Utils.optimizeImage(this.data.image.src, '800x');
            }
            // Build the page thumbnail
            if (itemThumbSrc.length > 0) {
                itemThumb = this.getTemplate(PageItemList.Enum.tempType.IMAGE);
            }
        }
    
        if (this.displayExcerpt && this.data.body_html && typeof this.data.body_html === 'string') {
            let summaryHtml = Utils.stripHtml(this.data.body_html);
            if (summaryHtml.length > 264) summaryHtml = summaryHtml.substr(0, Settings.getSettingValue('search.pageExcerptLimitCharacter')) + '...';
            itemExcerpt = this.getTemplate(PageItemList.Enum.tempType.EXCERPT).replace(/{{itemExcerpt}}/g, summaryHtml);
        }
    
        return this.getTemplate()
            .replace(/{{itemThumbnail}}/g, itemThumb)
            .replace(/{{itemThumbSrc}}/g, itemThumbSrc)
            .replace(/{{itemDesc}}/g, itemExcerpt)
            .replace(/{{class.filterResultItem}}/g, Class.filterResultItem)
            .replace(/{{itemUrl}}/g, pageUrl)
            .replace(/{{itemTitle}}/g, Utils.stripHtml(this.data.title));
    }
    
    //Scroll Event
    function Scroll() {
        var ypos = window.pageYOffset;
        var sticky_container = jQuery('.boost-pfs-filter-tree-desktop-button-sticky-wrapper');
    
        if (ypos > 250) {
            //console.log('====scroll:'+ypos);
            sticky_container.addClass('bg-white');
        } else {
            //console.log('====scroll:'+ypos);
            sticky_container.removeClass('bg-white');
        }
    }
    
    window.addEventListener("scroll", Scroll);
    
    /*if(Utils.isMobile()){
      var refinedItems = jQ('.boost-pfs-filter-refine-by-items').find('.refine-by-item').length;    
      if(refinedCounter > 0){
        jQ('.boost-pfs-filter-tree-mobile-button').find('.boost-pfs-filter-tree-mobile-button-label').append('<span class="refined-counter"> ('+ refinedCounter +')</span>');
      } 
    }*/
    
    boostPFSFilterConfig.general.enableKeepScrollbackPosition = true;
    
    /* End #148001 */
    
    /* #152867 */
    if (Utils.isSearchPage()) {
        let collectionAPI = 'https://services.mybcapps.com/bc-sf-filter/search/collections?q=' + Utils.getSearchTerm() + '&_=pf&shop=susan-shaw-jewelry.myshopify.com&page=1&limit=25&sort=relevance&display=grid&collection_scope=0&tag=&product_available=false&variant_available=false&build_filter_tree=true&check_cache=false&locale=en&event_type=search';
        $.ajax({
            type: "GET",
            url: collectionAPI,
            dataType: 'json'
        }).done(function(res) {
            let collectionData = res.collections;
            let collectionTotal = collectionData.length;
            let collectionHtml = '';
            if (collectionTotal > 0) {
                for (var i = 0; i < collectionData.length; i++) {
                    collectionHtml += '<div class="collection-item">';
                    collectionHtml += '<a href="/collections/' + collectionData[i].handle + '">';
                    if (collectionData[i].image !== null && collectionData[i].image.src) {
                        collectionHtml += '<img src="' + Utils.optimizeImage(collectionData[i].image.src, '400x') + '" />';
                    } else {
                        var firstImg;
                        $.ajax({
                            type: "GET",
                            url: '/collections/' + collectionData[i].handle + '?view=boost-pfs-first-image',
                            datatype: "json",
                            async: false,
                            success: function(data) {
                                firstImg = data;
                            }
                        });
                        collectionHtml += '<img src="' + firstImg + '" />';
                    }
                    collectionHtml += '<div class="collection-title">' + collectionData[i].title + '</div>';
                    collectionHtml += '</a>';
                    collectionHtml += '</div>';
                }
                jQ('.boost-pfs-search-collection-result-item-content').html(collectionHtml);
                jQ('.boost-pfs-search-collection-result-panel-controls li').text('Collections (' + collectionTotal + ')');
                jQ('.boost-pfs-search-collection-result-toolbar').show();
                if (collectionTotal > 1) {
                    jQ('.boost-pfs-search-collection-total-result').html('Showing <b>' + collectionTotal + '</b> results');
                } else {
                    jQ('.boost-pfs-search-collection-total-result').html('Showing <b>' + collectionTotal + '</b> result');
                }
            } else {
                jQ('.boost-pfs-search-collection-result-toolbar').hide();
            }
        });
    }
    /* End 152867 */
    
    /* end-boost-custom */

})(); // Add this at the end