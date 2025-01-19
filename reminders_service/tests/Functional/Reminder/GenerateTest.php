<?php

namespace App\Tests\Functional\Reminder;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Tests\Functional\DatabaseTestTrait;

class GenerateTest extends WebTestCase
{
    use DatabaseTestTrait;

    public function testGenerateReminders()
    {
        $this->client->request('GET', '/api/generate-reminders');

        $this->assertResponseIsSuccessful();
        $this->assertSame(200, $this->client->getResponse()->getStatusCode());
        $this->assertResponseHeaderSame('Content-Type', 'application/json');

        $responseData = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertArrayHasKey('message', $responseData);
        $this->assertStringContainsString("rappel(s) généré(s)", $responseData['message']);
    }
}
