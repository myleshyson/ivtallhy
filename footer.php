<?php
/**
 * @package WordPress
 * @subpackage Mad_Mouse_Theme
 * @since Mad Mouse Creative 1.0
 */
?>
    <footer id="footer" class="row expanded">
        <div class="row text-center" data-equalizer>
            <div class="medium-4 columns" data-equalizer-watch>
                <img src="<?php bloginfo('template_directory'); ?>/public/img/TallahasseeLogo_white.png">
            </div>
            <div class="medium-4 columns" data-equalizer-watch>
                <h2>InterVarsity USA</h2>
                <ul class="menu iv-national vertical">
                    <li><a href="http://intervarsity.org/" target="_blank">InterVarsity USA</a></li>
                    <li><a href="http://intervarsity.org/about/our/our-doctrinal-basis" target="_blank">Doctrinal Statement</a></li>
                    <li><a href="http://intervarsity.org/about/our/our-core-values" target="_blank">Core Values</a></li>
                    <li><a href="http://intervarsity.org/about/our/vital-statistics" target="_blank">Vital Statics</a></li>
                    <li><a href="http://intervarsity.org/blog" target="_blank">Blog</a></li>
                </ul>
            </div>
            <div class="medium-4 columns" id="connect" data-equalizer-watch>
                <h2>Connect With Us!</h2>
                <ul class="menu">
                    <li class="medium-3 columns"><a href="https://www.facebook.com/groups/InterVarsityTallahassee/" target="_blank"><i class="fa fa-facebook"></i></a></li>
                    <li class="medium-3 columns"><a href="https://www.instagram.com/intervarsity.tallahassee/" target="_blank"><i class="fa fa-instagram"></i></a></li>
                    <li class="medium-3 columns"><a href="<?php echo antispambot( get_option('admin_email') );?>" target="_blank"><i class="fa fa-envelope-o"></i></a></li>
                    <li class="medium-3 columns end"><a href="tel:904-343-9011"><i class="fa fa-mobile"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="copyright text-center">&copy;
            <?php echo date("Y"); echo " "; bloginfo('name'); ?>
        </div>
    </footer>
    </div>
    <!--End Off Canvas Content -->
    </div>
    <!--End Off Canvas Wrapper -->
    <?php wp_footer(); ?>
    <!-- here comes the javascript -->
    <!-- jQuery is called via the WordPress-friendly way via functions.php -->
    <!-- this is where we put our custom functions -->
    <script src="<?php bloginfo('template_directory'); ?>/public/js/foundation.js"></script>
    <script src="<?php bloginfo('template_directory'); ?>/public/js/all.js"></script>
    <!-- Asynchronous google analytics; this is the official snippet. PLACE HERE -->
    </body>

    </html>
