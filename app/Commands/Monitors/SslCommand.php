<?php

namespace Eyewitness\Eye\Commands\Monitors;

use Eyewitness\Eye\Eye;
use Illuminate\Console\Command;

class SslCommand extends Command
{
    /**
     * The eye instance.
     *
     * @var \Eyewitness\Eye\Eye;
     */
    protected $eye;

    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'eyewitness:monitor-ssl {--result}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Eyewitness.io - command to run a SSL check. Will be called automatically by the package.';

    /**
     * Indicates whether the command should be shown in the Artisan command list.
     *
     * @var bool
     */
    protected $hidden = true;

    /**
     * Create the Poll command.
     *
     * @param  \Eyewitness\Eye\Eye  $eye
     * @return void
     */
    public function __construct(Eye $eye)
    {
        parent::__construct();

        $this->eye = $eye;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if ($this->option('result')) {
            $this->eye->ssl()->result();
        } else {
            $this->eye->ssl()->poll();
        }

        $this->info('Eyewitness SSL poll complete.');
    }
}
