<?php

namespace App\Tests\Functional;

use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;

trait DatabaseTestTrait
{
    protected EntityManagerInterface $entityManager;
    protected KernelBrowser $client;

    /**
     * @throws Exception
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->client = static::createClient();
        $this->entityManager = $this->client->getContainer()->get('doctrine.orm.entity_manager');
        $this->resetDatabase();
    }

    /**
     * @throws Exception
     */
    private function resetDatabase(): void
    {
        $this->entityManager->getConnection()->beginTransaction();
        $this->entityManager->getConnection()->setAutoCommit(false);
    }

    /**
     * @throws Exception
     */
    protected function tearDown(): void
    {
        $this->entityManager->getConnection()->rollBack();
        $this->entityManager->getConnection()->setAutoCommit(true);

        parent::tearDown();
        $this->entityManager->close();
        unset($this->entityManager);
    }
}
