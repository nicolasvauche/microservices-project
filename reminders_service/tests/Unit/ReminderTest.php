<?php

namespace App\Tests\Unit;

use App\Entity\Reminder;
use PHPUnit\Framework\TestCase;

class ReminderTest extends TestCase
{
    public function testEntity()
    {
        $reminder = new Reminder();
        $reminder->setTitle('Rappel Test')
            ->setTaskId(1)
            ->setUserId(1)
            ->setSent(false);

        $this->assertInstanceOf(Reminder::class, $reminder);

        $this->assertNull($reminder->getId());
        $this->assertEquals('Rappel Test', $reminder->getTitle());
        $this->assertEquals(1, $reminder->getTaskId());
        $this->assertEquals(1, $reminder->getUserId());
        $this->assertFalse($reminder->isSent());
    }
}
