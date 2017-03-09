<?php
/**
 * @file
 * Contains template for rendering least expensive block.
 */



$results = json_decode($listings);
kpr($results);
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
<section class="least_expensive">
  <div class="least_expensive_container">
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
    $items[] = array(
      'slide' => '<img src="' . $image . '"/>',
      'caption' => array(
      'title' => t('THE TEST'),
      ),
    );
}

$element = slick_build($items, $options, $settings);
kpr($element);
print render($element);


?>
  </div>
</section>
