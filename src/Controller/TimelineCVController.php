<?php

namespace App\Controller;

use App\Entity\MileStone;
use App\Entity\BulletPoints;
use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TimelineCVController extends AbstractController
{
    #[Route('/timeline', name: 'app_timeline')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $mileStones = $entityManager->getRepository(MileStone::class)->findBy([], ['startDate' => 'ASC']);
        $bulletPoints = $entityManager->getRepository(BulletPoints::class)->findAll();

        $projects = $entityManager->getRepository(Project::class)
        ->createQueryBuilder('p')
        ->innerJoin('p.mileStone', 'm', 'WITH', 'm IS NOT NULL')
        ->getQuery()
        ->getResult();

        $experiences = [];

        foreach ($mileStones as $milestone) {
            $experiences[$milestone->getId()] = ['main' => $milestone, 'bullets' => []];
        }
        foreach ($bulletPoints as $bulletPoint) {
            $experiences[$bulletPoint->getMilestone()->getId()]['bullets'][] = $bulletPoint;
        }
        foreach ($projects as $project) {
            $experiences[$project->getMileStone()->getId()]['projects'][] = $project;
        }

        return $this->render('timeline_cv/index.html.twig', [
            'timeline_events' => $experiences,
        ]);
    }
}
