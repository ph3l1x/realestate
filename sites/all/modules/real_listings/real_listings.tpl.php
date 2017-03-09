<?php

setlocale(LC_MONETARY, "en_US");

function timeAgo($time) {

  $time = time() - $time; // to get the time since that moment

  $tokens = array(
    31536000 => 'year',
    2592000 => 'month',
    604800 => 'week',
    86400 => 'day',
    3600 => 'hour',
    60 => 'minute',
    1 => 'second'
  );

  foreach ($tokens as $unit => $text) {
    if ($time < $unit) continue;
    $numberOfUnits = floor($time / $unit);
    return $numberOfUnits . ' ' . $text . (($numberOfUnits > 1) ? 's' : '');
  }
}

kpr($data);
?>
<div class="listingContainer">
  <div class="listingContainerInner">
    <div class="listingHeaderContainer">
      <div class="listingHeaderContainerInner">
        <div class="top col-xs-12"><h3><?php print $data->L_Address . ' - ' . $data->L_City . ', ' . $data->L_State . ' ' . $data->L_Zip; ?></h3></div>
        <div class="middle col-xs-12">
          <div class="forSale row col-sm-2">
            <i class="fa fa-home"></i>
            <div class="forSaleText">FOR SALE</div>
          </div>
          <div class="row col-sm-3">
            <div class="listPrice">$<?php print number_format($data->L_AskingPrice); ?></div>
            <div class="listedDays"> Listed: <?php print timeAgo(strtotime($data->L_ListingDate)) . ' ago'; ?></div>
          </div>
          <div class="row col-sm-3">
            <div class="beds">Beds: <?php print $data->L_Keyword2; ?></div>
            <div class="beds">Baths: <?php print $data->LM_Dec_3 ; ?></div>
          </div>
          <div class="row col-sm-4">
            <div class="listingType"><?php print $data->L_Type; ?></div>
            <div class="sqft"><?php print $data->LM_int4_27; ?> sq ft</div>
          </div>
        </div>
      </div>
    </div>
    <div class="listingContentContainer">
      <div class="listingContentContainerInner">
        <div class="listingLeftContentContainer col-xs-12">
          <div class="listingLeftContentContainerInner">
            <div class="imageMapsContainer">
              <div class="imageMapContainerInner">
                <div class="imageMapTabs">
                  <ul>
                    <li class="imageMapImages tabButton tabButtonActive">Photos</li>
                    <li class="imageMapStreet tabButton">Stree View</li>
                    <li class="imageMapMap tabButton">Map</li>
                    <li class="imageMapSatellite tabButton">Satellite</li>
                  </ul>
                </div>
                <div class="tabbedContent">
                  <div class="imageMapContent mapImages">
                    <!-- Jssor Slider Begin -->
                    <div id="slider1_container" style="position: relative; top: 0px; left: 0px; width: 800px;height: 456px; background: #191919; overflow: hidden;">
                      <div u="loading" style="position: absolute; top: 0px; left: 0px;">
                        <div style="filter: alpha(opacity=70); opacity:0.7; position: absolute; display: block;
                background-color: #000000; top: 0px; left: 0px;width: 100%;height:100%;">
                        </div>
                        <div style="position: absolute; display: block; background: url(../img/loading.gif) no-repeat center center;
                top: 0px; left: 0px;width: 100%;height:100%;">
                        </div>
                      </div>
                      <div u="slides" style="cursor: move; position: absolute; left: 0px; top: 0px; width: 800px; height: 356px; overflow: hidden;">
                        <?php
                        if(isset($data->ALL_IMAGES)) {
                          foreach ($data->ALL_IMAGES as $image) {
                            $imageLocation = 'http://rets.mindimage.net/' . $image;
                            $imageTagLarge = theme('imagecache_external', array(
                              'path' => $imageLocation,
                              'style_name' => 'gallery_large',
                              'alt' => 'yadda',
                            ));
                            $imageTagsmall = theme('imagecache_external', array(
                              'path' => $imageLocation,
                              'style_name' => 'gallery_small',
                              'alt' => 'yadda',
                            ));
                            @$imageLarge = (string) reset(simplexml_import_dom(DOMDocument::loadHTML($imageTagLarge))->xpath("//img/@src"));
                            @$imageSmall = (string) reset(simplexml_import_dom(DOMDocument::loadHTML($imageTagsmall))->xpath("//img/@src"));
                            print '<div>';
                            print '   <img u="image" src="' . $imageLarge . '"/>';
                            print '   <img u="thumb" src="' . $imageSmall . '"/>';
                            print '</div>';
                          }
                        }
                        ?>
                      </div>
                      <span u="arrowleft" class="jssora05l" style="top: 158px; left: 8px;"></span>
                      <span u="arrowright" class="jssora05r" style="top: 158px; right: 8px"></span>
                      <div u="thumbnavigator" class="jssort01" style="left: 0px; bottom: 0px;">
                        <div u="slides" style="cursor: default;">
                          <div u="prototype" class="p">
                            <div class=w><div u="thumbnailtemplate" class="t"></div></div>
                            <div class=c></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Jssor Slider End -->
                  </div>
                  <div class="imageMapContent mapStreet">
                    <iframe width="100%" height="350" frameborder="0"
                            src="https://www.google.com/maps/embed/v1/streetview?key=AIzaSyD5H6x7p9HksOY_0kZoI8ToLBtHRGp1wU4&location=<?php print $data->LMD_MP_Latitude . ',' . $data->LMD_MP_Longitude; ?>&heading=210&pitch=1&fov=35"></iframe>
                  </div>
                  <div class="imageMapContent mapMap">
                    <iframe width="100%" height="350" frameborder="0"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5H6x7p9HksOY_0kZoI8ToLBtHRGp1wU4&q=<?php print str_replace(" ", "+", $data->L_Address) . ',' . $data->L_City . '+' . $mlsData->L_State . '+' . $mlsData->L_Zip; ?>&zoom=12&maptype=roadmap"></iframe>
                  </div>
                  <div class="imageMapContent mapSatellite">$address
                    <iframe width="100%" height="350" frameborder="0"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5H6x7p9HksOY_0kZoI8ToLBtHRGp1wU4&q=<?php print str_replace(" ", "+", $data->L_Address) . ',' . $data->L_City . '+' . $mlsData->L_State . '+' . $mlsData->L_Zip; ?>&zoom=10&maptype=satellite"></iframe>
                  </div></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div class="description">
              <h3>Desecription</h3>
              <?php print $data->L_Remarks; ?>
            </div>
            <div class="contentLeft col-xs-12 col-sm-6">
              <ul>
                <li><label>MLS ID#</label><?php print $data->L_ListingID; ?></li>
                <li><label>Year Built:</label><?php print  $data->LM_Int4_1; ?></li>
                <li><label>Listed:</label><?php print timeAgo(strtotime($data->L_ListingDate)) . ' ago'; ?></li>
              </ul>
            </div>
            <div class="contentRight col-xs-12 col-sm-6">
              <ul>
                <li><label>Listing Type: </label><?php print $data->L_Type; ?></li>
                <li><label>Beds:</label><?php print  $data->L_Keyword2; ?></li>
                <li><label>Baths:</label><?php print $data->LM_Dec_3; ?></li>
              </ul>
            </div>
            <h2 class="moreInfoBlock">Want More Information?</h2>
            <div class="moreInformationBlock">
              <?php $webform = module_invoke('webform', 'block_view', 'client-block-29');
              print $webform['content']; ?>
              <?php //print render(module_invoke('webform', 'block_view', 'client-block-29')['content']); ?>

            </div>
            <div class="listingDetailsContainer">
              <div class="listingDetailsContainerInner">
                <div class="listingDetailsTabs">
                  <ul>
                    <li class="tabInterior tabButton1 tabButtonActive1">Interior</li>
                    <li class="tabExterior tabButton1">Exterior</li>
                    <li class="tabMoreInfo tabButton1">More Info</li>
                    <li class="tabTaxes tabButton1">Taxes</li>
                    <li class="tabUtilities tabButton1">Utilities</li>
<!--                    <li class="tabPublicFacts tabButton1">Public Facts</li>-->
                    <li class="tabSchool tabButton1">Schools</li>
                  </ul>
                </div>
                <div class="tabbedContent">
                  <div class="listingTabContent tabInteriorInfo">
                    <?php if (!empty($data->LM_char5_1)) : ?>
                      <dl>
                        <dt>Master Bedroom</dt>
                        <dd><?php print $data->LM_char5_1; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char5_2)) : ?>
                      <dl>
                        <dt>Bedroom 2</dt>
                        <dd><?php print $data->LM_char5_2; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char5_3)) : ?>
                      <dl>
                        <dt>Bedroom 3</dt>
                        <dd><?php print $data->LM_char5_3; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char5_4)) : ?>
                      <dl>
                        <dt>Bedroom 4</dt>
                        <dd><?php print $data->LM_char5_4; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char5_5)) : ?>
                      <dl>
                        <dt>Bedroom 5</dt>
                        <dd><?php print $data->LM_char5_5; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_INCLUDEDKITCHENFEATURES_6)) : ?>
                      <dl>
                        <dt>Kitchen</dt>
                        <dd><?php print $data->LFD_INCLUDEDKITCHENFEATURES_6; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_FIREPLACE_3)) : ?>
                      <dl>
                        <dt>Fireplace</dt>
                        <dd><?php print $data->LFD_FIREPLACE_3; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->L_Keyword7)) : ?>
                      <dl>
                        <dt>Stories</dt>
                        <dd><?php print $data->L_Keyword7; ?></dd>
                      </dl>
                    <?php endif; ?>
                  </div>
                  <div class="listingTabContent tabExteriorInfo">
                    <?php if (!empty($data->L_Keyword1)) : ?>
                      <dl>
                        <dt>Lot Size</dt>
                        <dd><?php print $data->L_Keyword1; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Char10_2)) : ?>
                      <dl>
                        <dt>Lot Length</dt>
                        <dd><?php print $data->LM_Char10_2; ?>'</dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Char10_3)) : ?>
                      <dl>
                        <dt>Lot Width</dt>
                        <dd><?php print $dfata->LM_Char10_3; ?>'</dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->L_Keyword5)) : ?>
                      <dl>
                        <dt>Garages</dt>
                        <dd><?php print $data->L_Keyword5; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_int4_27)) : ?>
                      <dl>
                        <dt>Square Feet</dt>
                        <dd><?php print $data->LM_int4_27; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Dec_12)) : ?>
                      <dl>
                        <dt>Approx Price SQFT</dt>
                        <dd>$<?php print $data->LM_Dec_12; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_SPRINKLERSYSTEM_8)) : ?>
                      <dl>
                        <dt>Sprinkler System</dt>
                        <dd><?php print $data->LFD_SPRINKLERSYSTEM_8; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_ROOF_13)) : ?>
                      <dl>
                        <dt>Roofing</dt>
                        <dd><?php print $data->LFD_ROOF_13; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_POOLSPA_12)) : ?>
                      <dl>
                        <dt>Pool</dt>
                        <dd><?php print $data->LFD_POOLSPA_12; ?></dd>
                      </dl>
                    <?php endif; ?>
                  </div>
                  <div class="listingTabContent tabMoreInfoInfo">
                    <?php if (!empty($data->L_ListingDate)) : ?>
                      <dl>
                        <dt>Date Listed</dt>
                        <dd><?php print $data->L_ListingDate; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Int4_1)) : ?>
                      <dl>
                        <dt>Year Built</dt>
                        <dd><?php print $data->LM_Int4_1; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_WATER_17)) : ?>
                      <dl>
                        <dt>Water</dt>
                        <dd><?php print $data->LFD_WATER_17; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->L_Area)) : ?>
                      <dl>
                        <dt>Area</dt>
                        <dd><?php print $data->L_Area; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Char10_1)) : ?>
                      <dl>
                        <dt>County</dt>
                        <dd><?php print $data->LM_Char10_1; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char10_70)) : ?>
                      <dl>
                        <dt>Subdivision</dt>
                        <dd><?php print $data->LM_char10_70; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char100_1)) : ?>
                      <dl>
                        <dt>Directions</dt>
                        <dd><?php print $data->LM_char100_1; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->L_UpdateDate)) : ?>
                      <dl>
                        <dt>Last Updated</dt>
                        <dd><?php print $data->L_UpdateDate; ?></dd>
                      </dl>
                    <?php endif; ?>
                  </div>
                  <div class="listingTabContent tabTaxesInfo">
                    <?php if (!empty($data->LM_Dec_15)) : ?>
                      <dl>
                        <dt>Tax Amount</dt>
                        <dd>$<?php print $data->LM_Dec_15; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Int2_10)) : ?>
                      <dl>
                        <dt>Tax Year</dt>
                        <dd><?php print $data->LM_Int2_10; ?></dd>
                      </dl>
                    <?php endif; ?>
                  </div>
                  <div class="listingTabContent tabUtilitiesInfo">
                    <?php if (!empty($data->LFD_COOLING_1)) : ?>
                      <dl>
                        <dt>Cooling</dt>
                        <dd><?php print $data->LFD_COOLING_1; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_HEATING_5)) : ?>
                      <dl>
                        <dt>Heating</dt>
                        <dd><?php print $data->LFD_HEATING_5; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_SEWER_14)) : ?>
                      <dl>
                        <dt>Sewer</dt>
                        <dd><?php print $data->LFD_SEWER_14; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LFD_WATER_17)) : ?>
                      <dl>
                        <dt>Water</dt>
                        <dd><?php print $data->LFD_WATER_17; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char10_48)) : ?>
                      <dl>
                        <dt>Irrigation</dt>
                        <dd><?php print $data->LM_char10_48; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_Char25_14)) : ?>
                      <dl>
                        <dt>Irrigation District</dt>
                        <dd><?php print $data->LM_Char25_14; ?></dd>
                      </dl>
                    <?php endif; ?>
                  </div>
                  <div class="listingTabContent tabSchoolInfo">
                    <?php if (!empty($data->LM_char10_42)) : ?>
                      <dl>
                        <dt>School District</dt>
                        <dd><?php print $data->LM_char10_42; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char10_43)) : ?>
                      <dl>
                        <dt>Elementry School</dt>
                        <dd><?php print $data->LM_char10_43; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char10_44)) : ?>
                      <dl>
                        <dt>Jr. High School</dt>
                        <dd><?php print $data->LM_char10_44; ?></dd>
                      </dl>
                    <?php endif; ?>
                    <?php if (!empty($data->LM_char10_45)) : ?>
                      <dl>
                        <dt>High School</dt>
                        <dd><?php print $data->LM_char10_45; ?></dd>
                      </dl>
                    <?php endif; ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="listingBy">
        <h3>Listing Provided By:</h3>
        <div class="listingOffice"><?php print $data->ListingOffice ?></div>
        <div class="listingPhone"><?php print $data->ListingPhone; ?></div>
    </div>
  </div>
