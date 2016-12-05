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

  ?>
  <div class="animatedParent animateOnce">
    <div<?php if ($classes_array[$id]) { print ' class="animated fadeInRight slow services-right-'.$count .' '. $classes_array[$id] .'"';  } ?>>
      <?php print $row; ?>
    </div>
  </div>
<?php
$count++;
endforeach; ?>
