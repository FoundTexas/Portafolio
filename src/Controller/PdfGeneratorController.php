<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Dompdf\Dompdf;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Ordenlaboratorio;
use Doctrine\ORM\EntityManagerInterface;

class PdfGeneratorController extends AbstractController
{

    #[Route('/pdf/generator', name: 'app_pdf_generator')]
    public function index(): Response
    {
        // return $this->render('pdf_generator/index.html.twig', [
        //     'controller_name' => 'PdfGeneratorController',
        // ]);
        $data = [
            'imageSrc'  => $this->imageToBase64($this->getParameter('kernel.project_dir') . '/public/img/profile.png'),
            'name'         => 'John Doe',
            'address'      => 'USA',
            'mobileNumber' => '000000000',
            'email'        => 'john.doe@email.com'
        ];
        $html =  $this->renderView('pdf_generator/index.html.twig', $data);
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();
         
        return new Response (
            $dompdf->stream('resume', ["Attachment" => false]),
            Response::HTTP_OK,
            ['Content-Type' => 'application/pdf']
        );
    }
 
    private function imageToBase64($path) {
        $path = $path;
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }

    /**
     * @Route("/entry-point/{value}", name="app_entry_point")
     */
    public function entryPoint(string $value = null): Response
    {
        #$em = $this->getDoctrine()->getManager();
        #$LaboratoryOrder = $em->getRepository(Ordenlaboratorio::class)->findOneBy(array('idordenlaboratorio' => $value));

        // Render a Twig template
        return $this->render('pdf_generator/index.html.twig', [
            'logo' => $this->imageToBase64($this->getParameter('kernel.project_dir') . '/public/img/OptimoLogoAzul.png'),
            'qrCodeSrc' => $this->imageToBase64($this->getParameter('kernel.project_dir') . '/public/QRs/qr.png'),
            #'ol' => $LaboratoryOrder
        ]);
    }
}
