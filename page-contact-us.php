<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
get_header(); ?>


    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <div class="page-header" id="page-header"style="
    <?php if(has_post_thumbnail()) { ?>
    background-image: url('<?php echo get_the_post_thumbnail_url(); ?>');
    <?php } ?> 
    ">
    <h1 class="header-title text-center"><?php the_title(); ?></h1>
    </div>
  <?php endwhile; endif; ?>
<div data-sticky-container>
  <div data-sticky data-margin-top='0' data-top-anchor="page-header:bottom" data-btm-anchor="content:bottom">
    <?php get_template_part('parts/top-nav'); ?>
  </div>
</div>

<div class="row" id="content">

<div class="small-8 small-offset-2 main-content columns">
<div class="row text-center">
  <i class="fa fa-cog fa-spin hide" aria-hidden="true"></i>
</div>
<form data-abide novalidate id="contact-form">
  <div data-abide-error class="alert callout" style="display: none;">
    <p><i class="fi-alert"></i> There are some errors in your form.</p>
  </div>
  <div class="row">
    <div class="small-12 columns">
      <label>Name
        <input type="text" placeholder="Your Name" id="name" required>
        <span class="form-error">
          Yo, this is required
        </span>
      </label>
    </div>
    <div class="small-12 columns">
      <label>Phone Number
        <input type="text" placeholder="Your Phone Number Here" id="" pattern="phone">
        <span class="form-error">
         Needs to be a valid number 555-555-5555
        </span>
      </label>
    </div>
    <div class="small-12 columns">
      <label>Email
        <input type="text" placeholder="Your Email" id="email"  required pattern="email">
         <span class="form-error">
          Yea we need this too.
        </span>
      </label>
    </div>
  </div>
  <div class="row">
    <fieldset class="large-6 columns">
      <legend>What Campus do you go to?</legend>
      <input type="radio" name="campus" value="FSU" class="radio" id="FSU"><label for="FSU">FSU</label>
      <input type="radio" name="campus" value="TCC" class="radio" id="TCC"><label for="TCC">TCC</label>
      <input type="radio" name="campus" value="FAMU" class="radio" id="FAMU"><label for="FAMU">FAMU</label>
    </fieldset>
  </div>
  <div class="row">
    <div class="small-12 columns">
      <textarea name="comments" id="comments" cols="30" rows="10" data-abide-ignore placeholder="Any Comments?"></textarea>
    </div>
    <input type="text" name="address" id="address" class="hide">
  </div>
  <div class="row text-center">
    <button class="button large alert" type="submit" value="Submit" id="mailer">Submit</button>
  </div>
</form>
</div>
</div>

<?php get_footer(); ?>