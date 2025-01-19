<?php

namespace App\Controller;

use App\Service\Reminder\GenerateService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class GenerateController extends AbstractController
{
    #[Route('/api/generate-reminders', name: 'app_reminders/generate')]
    public function index(GenerateService $generateService): Response
    {
        return $this->json([
            'message' => $generateService->generateReminders(),
        ]);
    }
}
