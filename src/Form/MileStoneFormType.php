<?php

// src/Form/MileStoneFormType.php

namespace App\Form;

use App\Entity\MileStone;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MileStoneFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class)
            ->add('description', TextType::class)
            ->add('bulletpoints', TextType::class) // Example, adjust as needed
            ->add('startDate', DateType::class, [
                'format' => 'yyyy-MM-dd', // Specify desired date format
            ])
            ->add('endDate', DateType::class, [
                'format' => 'yyyy-MM-dd',
            ])
            ->add('tags', TextType::class) // Example, adjust as needed
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => MileStone::class,
        ]);
    }
}