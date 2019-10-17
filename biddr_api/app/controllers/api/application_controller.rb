class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  rescue_from StandardError, with: :standard_error
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def not_found
    render(
      status: 404,
      json:{
        status: 404,
        error:[{
          type: "NotFound"
        }]
      }
    )
  end

  private

  def api_key
    if requests.headers['AUTHORIZATION']
      request.headers['AUTHORIZATION']
    end
  end

  def authenticate_user!
    unless current_user.present?
      render(json: { status: 401 }, status: 401)
    end
  end

  protected

  def record_not_found(error)
  render(
    status:404,
    json:{
      status:404,
      errors:[{
        type: error.class.to_s,
        message:error.message
      }]
    }
  )
  end

  def standard_error(error)
    logger.error error.full_message

    render(
      status:500,
      json:{
        status:500,
        errors:[{
          type: error.class.to_s,
          message: error.message
        }]
      }
    )
  end
end
