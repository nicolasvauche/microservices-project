<?php

namespace App\Controller;

use App\Service\Reminder\ListService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DefaultController extends AbstractController
{
    #[Route('/api/my-reminders/{userId}', name: 'app_reminders_list')]
    public function index(ListService $listService,
                          int         $userId): Response
    {
        return $this->json($listService->getReminders($userId));
    }
}
