<!DOCTYPE html>
<html lang="tw">
  <head>
    <meta http-equiv="Content-Language" content="zh-tw" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />

    <title></title>
    <link href="css/public.css" rel="stylesheet" type="text/css" />

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=zh-TW" language="javascript" type="text/javascript" ></script>
    <script src="js/jquery_v1.10.2/jquery-1.10.2.min.js" language="javascript" type="text/javascript" ></script>
    <script src="js/public.js" language="javascript" type="text/javascript" ></script>

  </head>
  <body lang="zh-tw">
    <?php 
    include 'core.php';
    $stores = Store::find ('all', array ('conditions' => array ('status = 1')));
    ?>
    <div id='maps'></div>
    <div id='form'>
        <span></span>

        <div class='radios'>
            <label>
              <input type='radio' name='pokemon' value='1' />
              <span></span>
              Store
            </label>
            <label>
              <input type='radio' name='pokemon' value='2' />
              <span></span>
              Gym
            </label>
            <label>
              <input type='radio' name='pokemon' value='3' />
              <span></span>
              Sakura
            </label>
        </div>

    </div>

    <div id='menus'>
        <?php
        foreach ($stores as $store) { ?>
            <a data-id='<?php echo $store->id;?>' data-info='<?php echo json_encode (array (
                            'id' => $store->id,
                            'name' => $store->name,
                            'lat' => $store->latitude,
                            'lng' => $store->longitude,
                            'pokemon' => $store->pokemon ? $store->pokemon : 0
                        ));?>'><?php echo $store->name;?></a>
        <?php
        }
        ?>
    </div>
  </body>
</html>
