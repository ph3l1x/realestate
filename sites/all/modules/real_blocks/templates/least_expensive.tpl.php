<?php
/**
 * @file
 * Contains template for rendering least expensive block.
 */



$results = json_decode($listings);
kpr($results);
?>
<section class="least_expensive">
  <button class="left"><</button>
  <button class="right">></button>
  <div class="least_expensive_container">
<?php
foreach($results as $data) {
  ?>
  <div class="least_expensive_slider">
    <img src="http://rets.mindimage.net/<?php print $data->L_IMAGES ?>-1.jpg&w=100">
  </div>
  <?php
  print $data->L_ListingID;
}

?>
  </div>
</section>
