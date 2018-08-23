<!-- Welcome to the matrix neo -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Funland Australia</title>
    <meta name="description" content="<?=$page['metaDescription']?>">
    <meta name="keywords" content="<?=$page['metaKeywords']?>">
    <meta name="csrf-token" content="<?=$_SESSION['csrf_token']?>">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#138771">
    <meta name="apple-mobile-web-app-title" content="Funland">
    <meta name="application-name" content="Funland">
    <meta name="msapplication-TileColor" content="#3C134D">
    <meta name="theme-color" content="#3C134D">
    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy|Permanent+Marker" rel="stylesheet">
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?=$env['ga_tracking_id']?>"></script>
    <?php if ($env['env'] != 'local') {?>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<?=$env['ga_tracking_id']?>');
    </script>
    <?php }?>
</head>

<body<?=(isset($body_class) ? " class=\"$body_class\"" : '')?>>
    <?php if ($logged_in) {?>
    <div class="admin-header">
        <p>
            Hi <?=$user->username?>, you're currently editing
            <select name="page" id="page">
                <?php foreach ($pages as $p_id => $p) {?>
                <option value="<?=$p_id?>" data-url="<?=$p['url']?>"<?=($p_id == $page_id ? ' selected' : '')?>><?=$p['title']?></option>
                <?php }?>
            </select>
        </p>
        <a href="/logout" class="btn">Logout</a>
        <p class="full-width"><a href="#" class="toggle-page-content">View page content (<?=count($page)?> items)</a></p>
        <div class="page-content collapse">
            <strong>Title</strong>
            <strong>Content</strong>
            <strong>Last Changed</strong>
            <?php
            $page_content = mysqli_query($dbc, "SELECT * FROM content WHERE page = '$page_id'");
            if ($page_content && mysqli_num_rows($page_content)) {
                while ($t = mysqli_fetch_assoc($page_content)) {?>
                    <p><?=$t['title']?></p>
                    <p><?=nl2br($t['body'])?></p>
                    <p><?=$t['updated_at'] ?: $t['created_at']?></p>
                <?php
                }
            }?>
        </div>
    </div>
    <?php }?>
    <!-- HEADER -->
    <div class="header">
        <header>
            <div class="logo">
                <a href="/">
                    <img src="/img/funland-logo.png" alt="CrossFit Huey">
                </a>
            </div>
            <nav class="main-nav">
                <a href="/about" id="hAboutLink" title="See who we are + what we have to offer"<?= ($page_id == 3 ? ' class="active"' : '') ?>><span>About Us</span></a>
                <a href="/attractions" id="hAttractionsLink" title="View our great value rides + attractions"<?= ($page_id == 2 ? ' class="active"' : '') ?>><span>Attractions</span></a>
                <a href="/parties" id="hPartyLink" title="Info about our parties" <?= ($page_id == 4 ? ' class="active"' : '') ?>><span>Parties</span></a>
                <a href="/contact" id="hContactLink" title="Get in touch via phone, email or drop into the box" <?= ($page_id == 5 ? ' class="active"' : '') ?>><span>Contact</span></a>
            </nav>
            <div class="social">
                <a href="tel:0244543220" class="phone" id="hCtaNumber">(02) 4454 3220</a>
                <a href="https://www.facebook.com/Crossfit-Huey-233658973936251/" target="_blank" title="View CrossFit Huey on Facebook">
                    <svg enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Flat_copy" fill="currentColor"><path d="M11.848,32h6.612V15.998h4.411l0.584-5.514H18.46l0.007-2.761c0-1.437,0.137-2.209,2.2-2.209h2.757V0h-4.412   c-5.299,0-7.164,2.675-7.164,7.174v3.311H8.545v5.515h3.303V32z"/></g></svg>
                </a>
                <a href="https://www.instagram.com/" target="_blank" title="View CrossFit Huey on Instagram">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="currentColor" viewBox="0 0 56.7 56.7" enable-background="new 0 0 56.7 56.7" xml:space="preserve"><g><path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7 c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"></path><circle cx="41.5" cy="16.4" r="2.9"></circle><path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9 h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3 s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6 c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"></path></g></svg>
                </a>
            </div>
        </header>
    </div>
