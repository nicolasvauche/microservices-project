<?php

namespace App\Service\Reminder;

use App\Repository\ReminderRepository;

readonly class ListService
{
    public function __construct(private ReminderRepository $reminderRepository)
    {
    }

    public function getReminders(int $userId): array
    {
        return $this->reminderRepository->findBy(['userId' => $userId, 'sent' => false]);
    }
}
