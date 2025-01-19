<?php

namespace App\Service\Reminder;

use App\Entity\Reminder;
use App\Repository\ReminderRepository;
use App\Service\Task\TaskService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class GenerateService
{
    public function __construct(private EntityManagerInterface $entityManager,
                                private TaskService            $taskService,
                                private string                 $timezone = 'Europe/Paris')
    {
    }

    /**
     * @throws \DateInvalidTimeZoneException
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     * @throws \DateMalformedStringException
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     */
    public function generateReminders(): string
    {
        $tasks = $this->taskService->fetchTasks();

        $limitDate = new \DateTimeImmutable('now +1 day', new \DateTimeZone($this->timezone));

        $tasksToProcess = $this->filterExpiringTasks($tasks, $limitDate);
        $reminderCount = $this->createRemindersForTasks($tasksToProcess);

        return "$reminderCount rappel(s) généré(s)";
    }

    /**
     * @throws \DateMalformedStringException
     * @throws \DateInvalidTimeZoneException
     */
    private function filterExpiringTasks(array $tasks, \DateTimeImmutable $limitDate): array
    {
        $now = new \DateTimeImmutable('now', new \DateTimeZone($this->timezone));

        return array_filter($tasks, function($task) use ($now, $limitDate) {
            $expireAt = new \DateTimeImmutable($task['expires_at'], new \DateTimeZone($this->timezone));

            return $expireAt > $now && $expireAt <= $limitDate;
        });
    }

    private function createRemindersForTasks(array $tasks): int
    {
        $reminderCount = 0;

        foreach($tasks as $task) {
            if($this->hasUnsentReminder($task['id'])) {
                continue;
            }

            $this->createReminder($task);
            $reminderCount++;
        }

        $this->entityManager->flush();

        return $reminderCount;
    }

    private function hasUnsentReminder(int $taskId): bool
    {
        return null !== $this->entityManager->getRepository(Reminder::class)
                ->findOneBy(['taskId' => $taskId, 'sent' => false]);
    }

    private function createReminder(array $task): void
    {
        $reminder = new Reminder();
        $reminder->setTaskId($task['id'])
            ->setUserId($task['user_id'])
            ->setTitle("Votre tâche {$task['title']} expire demain !")
            ->setSent(false);

        $this->entityManager->persist($reminder);
    }
}
