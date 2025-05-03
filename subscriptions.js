export async function createSubscription(userId, planData) {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{
      user_id: userId,
      plan_type: planData.planType,
      start_date: new Date(),
      end_date: planData.endDate,
      payment_id: planData.paymentId,
      amount: planData.amount
    }]);

  if (error) throw error;
  return data;
} 