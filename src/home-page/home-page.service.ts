import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AboutOurCompany,
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  OurThreePrinciples,
  Plans,
  SectionHeadings,
  Testimonials,
  WhyChooseUs,
} from './entities';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  HeroHeadingsDto,
  HowItWorksDto,
  OfferHeadingsDto,
  SectionHeadingDto,
} from './dto';
import { PricePlanDto } from './dto/price-plan.dto';
import { SuccessMessageDto } from 'src/auth/dtos';
import { SectionName } from './types/section-name.enum';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HeroHeadings)
    private heroHeadingsRepo: Repository<HeroHeadings>,

    @InjectRepository(HowItWorks)
    private howItWorksRepo: Repository<HowItWorks>,

    @InjectRepository(SectionHeadings)
    private sectionHeadingsRepo: Repository<SectionHeadings>,

    @InjectRepository(Plans)
    private plansRepo: Repository<Plans>,

    @InjectRepository(OfferHeadings)
    private offerHeadingsRepo: Repository<OfferHeadings>,

    @InjectRepository(AboutOurCompany)
    private aboutOurCompanyRepo: Repository<AboutOurCompany>,

    @InjectRepository(OurThreePrinciples)
    private ourThreePrinciplesRepo: Repository<OurThreePrinciples>,

    @InjectRepository(WhyChooseUs)
    private whyChooseRepo: Repository<WhyChooseUs>,

    @InjectRepository(Testimonials)
    private testimonialsRepo: Repository<Testimonials>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Add Hero Headlines
  async addHeroHeadlines({
    firstHeading,
    secondHeading,
    thirdHeading,
  }: HeroHeadingsDto) {
    // const heroHeading = this.heroHeadingsRepo.create({
    //   firstHeading,
    //   secondHeading,
    //   thirdHeading,
    // });

    // return this.heroHeadingsRepo.save(heroHeading);

    return await this.heroHeadingsRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Delete all entries
        await transactionalEntityManager.delete(HeroHeadings, {});

        // Create and save new entry
        const heroHeading = this.heroHeadingsRepo.create({
          firstHeading,
          secondHeading,
          thirdHeading,
        });

        return transactionalEntityManager.save(heroHeading);
      },
    );
  }

  // async updateHeroHeadings(
  //   id: string,
  //   { firstHeading, secondHeading, thirdHeading }: HeroHeadingsDto,
  // ): Promise<HeroHeadings> {
  //   try {
  //     const heroHeadings = await this.heroHeadingsRepo.findOne({
  //       where: { id },
  //     });

  //     if (!heroHeadings) {
  //       throw new NotFoundException(`No Headings found with id: ${id}`);
  //     }

  //     heroHeadings.firstHeading = firstHeading;
  //     heroHeadings.secondHeading = secondHeading;
  //     heroHeadings.thirdHeading = thirdHeading;

  //     // Success response
  //     return this.heroHeadingsRepo.save(heroHeadings);
  //   } catch (error) {
  //     console.log(`Error while updating home page heading: ${error}`);
  //     throw new InternalServerErrorException();
  //   }
  // }

  async getHeroHeadings(): Promise<HeroHeadings> {
    const heroHeading = await this.heroHeadingsRepo.find();

    if (!heroHeading) {
      throw new NotFoundException('Hero heading not found');
    }

    return heroHeading[0];
  }

  async addHowItWorks({ title, description }: HowItWorksDto) {
    const howItWorks = this.howItWorksRepo.create({
      title,
      description,
    });
    return this.howItWorksRepo.save(howItWorks);
  }

  async updateHowItWorks(
    id: string,
    { title, description }: HowItWorksDto,
  ): Promise<HowItWorks> {
    try {
      const howItWorks = await this.howItWorksRepo.findOne({ where: { id } });

      if (!howItWorks) {
        throw new NotFoundException(
          `No How-Its-Works data found with id: ${id} `,
        );
      }

      howItWorks.title = title;
      howItWorks.description = description;

      return this.howItWorksRepo.save(howItWorks);
    } catch (error) {
      console.log(`Error at updating how it works`, error);
      throw new InternalServerErrorException();
    }
  }

  async getHowItWork(): Promise<HowItWorks> {
    const howItWorks = await this.howItWorksRepo.find();

    if (!howItWorks && howItWorks.length <= 0) {
      throw new NotFoundException('No data found for How-It-Works');
    }

    return howItWorks[0];
  }

  async deletehowItWorks(id: string): Promise<SuccessMessageDto> {
    try {
      const deletedHowItWorks = await this.howItWorksRepo.findOne({
        where: { id },
      });

      if (!deletedHowItWorks) {
        throw new NotFoundException(`No How it works found with id: ${id}`);
      }

      await this.howItWorksRepo.softDelete({ id });

      return { message: 'Deleted Successfully' };
    } catch (error) {
      console.log(`Error while deleting howw it works with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  async addSectionHeadings({
    heading,
    sectionName,
    subheading,
  }: SectionHeadingDto): Promise<SectionHeadings> {
    try {
      const existingSectionHeading = await this.sectionHeadingsRepo.findOne({
        where: { sectionName },
      });

      if (existingSectionHeading) {
        existingSectionHeading.heading = heading;
        existingSectionHeading.subheading = subheading;
        existingSectionHeading.sectionName = sectionName;

        return this.sectionHeadingsRepo.save(existingSectionHeading);
      }

      const sectionheadings = this.sectionHeadingsRepo.create({
        heading,
        sectionName,
        subheading,
      });

      return this.sectionHeadingsRepo.save(sectionheadings);
    } catch (error) {
      console.log(`Error saving section headings`, error);
      throw new InternalServerErrorException();
    }
  }

  async updateSectionHeadings(
    sectionName: SectionName,
    { heading, subheading }: SectionHeadingDto,
  ): Promise<SectionHeadings> {
    try {
      const sectionHeadings = await this.sectionHeadingsRepo.findOne({
        where: { sectionName },
      });

      if (!sectionHeadings) {
        throw new NotFoundException(
          `Section Headings is not found with section name: ${sectionName} `,
        );
      }

      sectionHeadings.heading = heading;
      sectionHeadings.subheading = subheading;

      return this.sectionHeadingsRepo.save(sectionHeadings);
    } catch (error) {
      console.log(
        `Error updating section headings with section Name: ${sectionName}`,
        error,
      );
      throw new InternalServerErrorException();
    }
  }

  async getSectionHeadings(): Promise<SectionHeadings[]> {
    try {
      return this.sectionHeadingsRepo.find();
    } catch (error) {
      console.log(`Error getting section headings`, error);

      throw new InternalServerErrorException();
    }
  }

  async getSectionHeadingByName(
    sectionName: SectionName,
  ): Promise<SectionHeadings> {
    try {
      const data = await this.sectionHeadingsRepo.findOne({
        where: { sectionName },
      });
      if (!data) {
        throw new NotFoundException(
          `No section heading found with name: ${sectionName}`,
        );
      }

      return data;
    } catch (error) {
      console.log(
        `Error while finding section Heading by name: ${sectionName}`,
        error,
      );

      throw new InternalServerErrorException();
    }
  }

  async addPricePlan({
    plan,
    heading,
    line,
    free,
    slogan,
    amount,
    services,
  }: PricePlanDto): Promise<Plans> {
    try {
      const newPlan = this.plansRepo.create({
        plan,
        heading,
        line,
        free,
        slogan,
        amount,
        services,
      });

      return this.plansRepo.save(newPlan);
    } catch (error) {
      console.log(`Error creating new plan `, error);
      throw new InternalServerErrorException();
    }
  }

  async updatePricePlan(
    id: string,
    { plan, heading, line, free, slogan, amount, services }: PricePlanDto,
  ): Promise<Plans> {
    try {
      const existingPlan = await this.plansRepo.findOne({ where: { id } });

      if (!existingPlan) {
        throw new NotFoundException(`No price plan found with id: ${id}`);
      }

      Object.assign(existingPlan, {
        plan,
        heading,
        line,
        free,
        slogan,
        amount,
        services,
      });

      return this.plansRepo.save(existingPlan);
    } catch (error) {
      console.log(`Error while updating plan with id: ${id}`, error);

      throw new InternalServerErrorException();
    }
  }

  async getAllPricePlans(): Promise<Plans[]> {
    return this.plansRepo.find();
  }

  async deletePricePlanById(id: string): Promise<SuccessMessageDto> {
    try {
      const deletedPlan = await this.plansRepo.findOne({ where: { id } });

      if (!deletedPlan) {
        throw new NotFoundException(`No plan found with id: ${id}`);
      }

      await this.plansRepo.softDelete({ id });

      return { message: 'Deleted Successfully' };
    } catch (error) {
      console.log(`Error while deleting price plan with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  async addOfferHeadings({
    heading,
    subheading,
    description,
  }: OfferHeadingsDto): Promise<OfferHeadings> {
    try {
      const offerHeading = this.offerHeadingsRepo.create({
        heading,
        subheading,
        description,
      });
      return this.offerHeadingsRepo.save(offerHeading);
    } catch (error) {
      console.log(`Error adding offer heading`, error);
      throw new InternalServerErrorException();
    }
  }

  async updateOfferHeadings(
    id: string,
    { heading, subheading, description }: OfferHeadingsDto,
  ): Promise<OfferHeadings> {
    try {
      const offerHeading = await this.offerHeadingsRepo.findOne({
        where: { id },
      });

      if (!offerHeading) {
        throw new NotFoundException(`No offer found with id: ${id}`);
      }

      Object.assign(offerHeading, { heading, subheading, description });

      return this.offerHeadingsRepo.save(offerHeading);
    } catch (error) {
      console.log(`Error while updating offer heading with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  async getAllOfferHeadings(): Promise<OfferHeadings[]> {
    return this.offerHeadingsRepo.find();
  }

  async deleteOfferHeadings(id: string): Promise<SuccessMessageDto> {
    try {
      const offer = await this.offerHeadingsRepo.findOne({
        where: { id },
      });

      if (!offer) {
        throw new NotFoundException(`No plan found with id: ${id}`);
      }

      await this.plansRepo.softDelete({ id });

      return { message: 'Deleted Successfully' };
    } catch (error) {
      console.log(`Error deleting offer heading with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }
}
