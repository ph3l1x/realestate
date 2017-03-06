<?php
/**
 * @file
 * Contains template for rendering least expensive block.
 */



$results = json_decode($listings);
kpr($results);
?>
<section class="least_expensive">
  <div class="least_expensive_container">
      <button class="left"><</button>
      <button class="right">></button>
<?php
foreach($results as $data) {
    $checkImage = 'http://rets.mindimage.net/images/' . $data->L_ListingID . '-1.jpg';
    if(!@getimagesize($checkImage)) {
        $image = 'sites/default/files/no-image.gif';
    } else {
      $image = 'http://rets.mindimage.net/' . $data->L_IMAGES . '-1.jpg&w=420&h=200';
    }
  ?>
  <div class="least_expensive_slider">
    <img src="<?php print $image; ?>">
  </div>
  <?php
  print $data->L_ListingID;
}

?>
  </div>
</section>
