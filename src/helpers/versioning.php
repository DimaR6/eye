<?php

/**
 * Compare Laravel 5.x version to the variable given
 *
 * @param  double  $version
 * @return boolean
 */
if (! function_exists('laravel_version_is')) {
    function laravel_version_is($operator, $version, $laravel = null)
    {
        if (is_null($laravel)) {
            $laravel = app()->version();
        }

        $laravel = strtok($laravel, ' ');

        if ($laravel === '5.5-dev') {
            return version_compare('5.5.0', $version, $operator);
        }

        return version_compare($laravel, $version, $operator);
    }
}