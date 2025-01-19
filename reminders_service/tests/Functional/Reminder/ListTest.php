<?php

namespace App\Tests\Functional\Reminder;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Tests\Functional\DatabaseTestTrait;

class ListTest extends WebTestCase
{
    use DatabaseTestTrait;

    public function testGenerateReminders()
    {
        $this->client->request('GET', '/api/my-reminders/1');

        $this->assertResponseIsSuccessful();
        $this->assertSame(200, $this->client->getResponse()->getStatusCode());
        $this->assertResponseHeaderSame('Content-Type', 'application/json');

        $responseData = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
    }
}
