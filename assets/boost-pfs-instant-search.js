// Override Settings
var boostPFSInstantSearchConfig = {
  search: {
    //suggestionMode: 'test',
  }
};

(function() {

  BoostPFS.inject(this); // Add this
  // Customize style of Suggestion box
  SearchInput.prototype.customizeInstantSearch = function(suggestionElement, searchElement, searchBoxId) {
    if (jQ(searchBoxId).closest('.search_container').length > 0) {
      this.setSuggestionWidth(searchBoxId, 400);
    }
  };

  /* Fix search issue on mobile */
  InstantSearch.prototype.init = function() {
    var inputElements = jQ('input[name="' + Settings.getSettingValue('search.termKey') + '"]:not([data-disable-instant-search])');
    inputElements.each((index, inputElement) => {

      if (jQ(inputElement).attr('id') == 'q' && Utils.isMobile()) {
        var id = jQ(inputElement).attr('id');
      } else {
        var id = 'boost-pfs-search-box-' + index;
      }
      var searchBox = new SearchInput(id, jQ(inputElement));
      this.addComponent(searchBox);
    });
    // Build search input for mobile
    if (Utils.isMobile()) {
      // Clear cache when going back from another page
      window.onpageshow = (event) => {
        if (event.persisted) {
          window.location.reload();
        }
      }
      // Build Suggestion mobile on top
      if (Settings.getSettingValue('search.suggestionMobileStyle') !== InstantSearchEnum.Mobile.SuggestionType.STYLE_2) {
        var instantSearchMobile = InstantSearchStyle.instantSearchMobile();
        this.addComponent(instantSearchMobile);
      }
    }
    // Build search input for style3
    if (!Utils.isMobile() && Settings.getSettingValue('search.suggestionStyle') === 'style3' || Settings.getSettingValue('search.suggestionColumn') === '2-overlay-fullwidth') {
      var instantSearchStyle3 = InstantSearchStyle.instantSearchStyle3();
      this.addComponent(instantSearchStyle3);
    }
  };

  InstantSearchMobile.prototype.afterCloseInstantSearchMobile = function (isClose) {
    jQ('.close-search').click();
  }

  // #152867
  InstantSearchResultItemCollection.prototype.getTemplate = function() {
		return `
			<li class="{{class.searchSuggestionItem}} {{class.searchUiAutocompleteItem}}" aria-label="{{escapedBlockType}}: {{escapedDataTitle}}" role="option">
			{{suggestionImage}}
            <div class="collection-title"><a tabindex="-1" href="{{searchLink}}">{{highlightedSuggestionResult}}</a></div>
			</li>
		`.trim();
	}

  InstantSearchResultItemCollection.prototype.compileTemplate = function() {
		if (!this.isShow) {
			return '';
		}
		this.searchTerm = Utils.stripHtml(Globals.currentTerm);
		var searchLink = Utils.reBuildUrlBaseOnLocale('/collections/' + this.data.handle);
		var highlightedSuggestionResult = this._highlightSuggestionResult(this.data.title, this.searchTerm);

        // Add image to collection of instant search
        if(this.data.image !== null){
          var suggestionImage = '<div class="collection-image"><a tabindex="-1" href="{{searchLink}}"><img src="'+ Utils.optimizeImage(this.data.image.src,'300x') +'" /></a></div>';
        }else{
          var firstImg;
          $.ajax({
            type: "GET",
            url: '/collections/'+ this.data.handle + '?view=boost-pfs-first-image',
            datatype: "json",
            async: false,
            success: function(data){
              firstImg = data;            
            }
          });
          var suggestionImage = '<div class="collection-image"><a tabindex="-1" href="{{searchLink}}"><img src="'+ firstImg +'" /></a></div>';
        }
    
		return this.getTemplate()
            .replace(/{{suggestionImage}}/g, suggestionImage)
			.replace(/{{escapedBlockType}}/g, Utils.stripHtml(this.parent.type))
			.replace(/{{escapedDataTitle}}/g, Utils.stripHtml(this.data.title))
			.replace(/{{escapedDataId}}/g, Utils.stripHtml(this.data.id))
			.replace(/{{class.searchSuggestionItem}}/g, Class.searchSuggestionItem)
			.replace(/{{class.searchUiAutocompleteItem}}/g, Class.searchUiAutocompleteItem)
			.replace(/{{searchLink}}/g, searchLink)
			.replace(/{{highlightedSuggestionResult}}/g, highlightedSuggestionResult);
	}
    // End #152867

})();