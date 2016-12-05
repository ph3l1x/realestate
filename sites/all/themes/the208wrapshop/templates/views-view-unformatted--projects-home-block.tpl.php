<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php
$count = 1;
foreach ($rows as $id => $row):

  if($count == '1') {
    $animation = 'fadeInLeft';
  }
  if($count == '2') {
    $animation = 'fadeInRight';
  }

  ?>
  <div class="animatedParent animateOnce">
  <div<?php if ($classes_array[$id]) { print ' class="animated '. $animation . ' col-xs-12 col-sm-6 ' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </div>
  </div>
<?php

$count++;
endforeach; ?>
