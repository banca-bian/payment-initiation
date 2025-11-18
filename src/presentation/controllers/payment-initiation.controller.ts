import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  InitiatePaymentUseCase,
  UpdatePaymentUseCase,
  RetrievePaymentUseCase,
  RetrieveComplianceUseCase,
  RetrieveFundingCheckUseCase,
  RetrieveOrderInitiationUseCase,
} from '../../application/use-cases';
import {
  InitiatePaymentDto,
  UpdatePaymentDto,
  PaymentResponseDto,
  ComplianceResponseDto,
  FundingCheckResponseDto,
  OrderInitiationResponseDto,
} from '../../application/dtos';

/**
 * Payment Initiation Controller
 * Implements BIAN Payment Initiation Service Domain API
 */
@ApiTags('Payment Initiation')
@Controller('PaymentInitiation')
export class PaymentInitiationController {
  constructor(
    private readonly initiatePaymentUseCase: InitiatePaymentUseCase,
    private readonly updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly retrievePaymentUseCase: RetrievePaymentUseCase,
    private readonly retrieveComplianceUseCase: RetrieveComplianceUseCase,
    private readonly retrieveFundingCheckUseCase: RetrieveFundingCheckUseCase,
    private readonly retrieveOrderInitiationUseCase: RetrieveOrderInitiationUseCase,
  ) {}

  /**
   * CR - Initiate Payment Transaction
   * POST /PaymentInitiation/Initiate
   */
  @Post('Initiate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'InCR Initiate a payment transaction' })
  @ApiResponse({
    status: 200,
    description: 'Payment transaction initiated successfully',
    type: PaymentResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async initiate(
    @Body(new ValidationPipe({ transform: true })) dto: InitiatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return await this.initiatePaymentUseCase.execute(dto);
  }

  /**
   * CR - Update Payment Transaction
   * PUT /PaymentInitiation/{paymentinitiationid}/Update
   */
  @Put(':paymentinitiationid/Update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'UpCR Update details of a payment transaction instruction' })
  @ApiParam({ name: 'paymentinitiationid', description: 'Payment Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment transaction updated successfully',
    type: PaymentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Payment transaction not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(
    @Param('paymentinitiationid') paymentId: string,
    @Body(new ValidationPipe({ transform: true })) dto: UpdatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return await this.updatePaymentUseCase.execute(paymentId, dto);
  }

  /**
   * CR - Retrieve Payment Transaction
   * GET /PaymentInitiation/{paymentinitiationid}/Retrieve
   */
  @Get(':paymentinitiationid/Retrieve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ReCR Retrieve details about a payment transaction' })
  @ApiParam({ name: 'paymentinitiationid', description: 'Payment Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment transaction retrieved successfully',
    type: PaymentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Payment transaction not found' })
  async retrieve(@Param('paymentinitiationid') paymentId: string): Promise<PaymentResponseDto> {
    return await this.retrievePaymentUseCase.execute(paymentId);
  }

  /**
   * BQ - Retrieve Compliance
   * GET /PaymentInitiation/{paymentinitiationid}/Compliance/{complianceid}/Retrieve
   */
  @Get(':paymentinitiationid/Compliance/:complianceid/Retrieve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ReBQ Retrieve details about a payment transaction compliance check' })
  @ApiParam({ name: 'paymentinitiationid', description: 'Payment Transaction ID' })
  @ApiParam({ name: 'complianceid', description: 'Compliance Step ID' })
  @ApiResponse({
    status: 200,
    description: 'Compliance check details retrieved successfully',
    type: ComplianceResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Compliance check not found' })
  async retrieveCompliance(
    @Param('paymentinitiationid') paymentId: string,
    @Param('complianceid') complianceId: string,
  ): Promise<ComplianceResponseDto> {
    return await this.retrieveComplianceUseCase.execute(paymentId, complianceId);
  }

  /**
   * BQ - Retrieve Funding Check
   * GET /PaymentInitiation/{paymentinitiationid}/FundingCheck/{fundingcheckid}/Retrieve
   */
  @Get(':paymentinitiationid/FundingCheck/:fundingcheckid/Retrieve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'ReBQ Retrieve details about a payment transaction funds available',
  })
  @ApiParam({ name: 'paymentinitiationid', description: 'Payment Transaction ID' })
  @ApiParam({ name: 'fundingcheckid', description: 'Funding Check Step ID' })
  @ApiResponse({
    status: 200,
    description: 'Funding check details retrieved successfully',
    type: FundingCheckResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Funding check not found' })
  async retrieveFundingCheck(
    @Param('paymentinitiationid') paymentId: string,
    @Param('fundingcheckid') fundingCheckId: string,
  ): Promise<FundingCheckResponseDto> {
    return await this.retrieveFundingCheckUseCase.execute(paymentId, fundingCheckId);
  }

  /**
   * BQ - Retrieve Order Initiation
   * GET /PaymentInitiation/{paymentinitiationid}/OrderInitiation/{orderinitiationid}/Retrieve
   */
  @Get(':paymentinitiationid/OrderInitiation/:orderinitiationid/Retrieve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ReBQ Retrieve details about the payment order initiation' })
  @ApiParam({ name: 'paymentinitiationid', description: 'Payment Transaction ID' })
  @ApiParam({ name: 'orderinitiationid', description: 'Order Initiation Step ID' })
  @ApiResponse({
    status: 200,
    description: 'Order initiation details retrieved successfully',
    type: OrderInitiationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order initiation not found' })
  async retrieveOrderInitiation(
    @Param('paymentinitiationid') paymentId: string,
    @Param('orderinitiationid') orderInitiationId: string,
  ): Promise<OrderInitiationResponseDto> {
    return await this.retrieveOrderInitiationUseCase.execute(paymentId, orderInitiationId);
  }
}
