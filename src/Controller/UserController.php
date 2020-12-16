<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use App\Entity\Beneficiary;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class UserController extends AbstractController
{
    /**
    * @Route("/searchUsers", methods={"GET"});
    */
    public function findUsers(Request $request): Response
    {
        $name = $request->query->get("name");
        $beneficiary = $this->getDoctrine()
            ->getRepository(Beneficiary::Class)
            ->findBy(["name" => $name]);
        if ($beneficiary) return $this->json($beneficiary);
         return $this->json([]);
    }
    /**
    * @Route("/deleteUsers", methods={"DELETE"});
    */
    public function deleteUsers(Request $request): Response
    {
        $name = $request->query->get("name");
        $em = $this->getDoctrine()->getManager();
        
        $beneficiarys = $em->getRepository(Beneficiary::Class)->findBy([
            "name" => $name
        ]);
        foreach($beneficiarys as $bene){
            $em->remove($bene);
        }
        $em->flush();
        return $this->json([]);
    }
}