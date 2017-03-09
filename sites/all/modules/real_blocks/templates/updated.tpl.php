<?php
/**
 * @file
 * Contains template for rendering least expensive block.
 */

$results = json_decode($listings);
$element = array();
$items = array();
$attach = array();
$optionset = slick_optionset_load('home_page');
$options = $optionset->options['settings'];
$settings = array(
  'optionset' => 'home_page',
  'media_switch' => 'colorbox-switch',
  'skin' => 'fullwidth',
);

?>
<section class="home_block_slider">
  <div class="home_block_slider_container">
    <h2>Recently Updated Listings</h2>
    <div class="title-sub">Listings that have been recently updated</div>
    <?php
    foreach($results as $data) {
      $checkImage = 'http://rets.mindimage.net/images/' . $data->L_ListingID . '-1.jpg';
      if(!@getimagesize($checkImage)) {
        $image = image_style_url('home_page_sliders', file_build_uri('no-image.gif'));
      } else {
        // $image = 'http://rets.mindimage.net/' . $data->L_IMAGES . '-1.jpg&w=420&h=200';
        $imagePath = 'http://rets.mindimage.net/images/' . $data->L_ListingID . '-1.jpg';
        $imageTag = theme('imagecache_external', array(
          'path' => $imagePath,
          'style_name' => 'home_page_sliders',
          'alt' => 'yadda',
        ));
        @$image = (string) reset(simplexml_import_dom(DOMDocument::loadHTML($imageTag))->xpath("//img/@src"));
      }
      $description = '<div class="listingContainer">
                    <a href="/listings/' . $data->L_ListingID . '">
                        <div class="listingBackdrop listingStyles"></div>
                        <div class="imageCount listingStyles floats">' . $data->L_PictureCount . ' photos</div>
                        <div class="propertyType listingStyles">' . $data->L_Type_ . ' for sale</div>
                        <div class="priceLineItems listingStyles">
                            <div class="askingPrice floats">$' . number_format($data->L_AskingPrice) . '&nbsp;</div>
                            <div class="beds floats mini">' . $data->L_Keyword2 . ' bds &nbsp;</div>
                            <div class="baths floats mini">' . $data->LM_Dec_3 . 'ba &nbsp;</div>
                            <div class="sqft floats mini">' . $data->LM_int4_27 . ' sqft &nbsp;</div>
                        </div>
                        <div class="addressContainer listingStyles">
                            <div class="street floats">' . $data->L_Address . ', </div>
                            <div class="state floats">' . $data->L_City . ' - </div>
                            <div class="city floats">' . $data->L_State . '</div>
                        </div>
                    </a>
                </div>';
      $items[] = array(
        'slide' => '<img src="' . $image . '"/>',
        'caption' => array(
          'data' => $description
        ),
      );
    }

    $element = slick_build($items, $options, $settings);
    print render($element);
    ?>
    <div class="button-area">
      <button type="button" class="see-more"><span>See more listings</span></button>
    </div>
  </div>
</section>
